// import { ObjectId } from "mongodb";
// import { getDb } from "../../config/database";
// import { Projects } from "./projects.model";

// export class ProjectsRepository {

//   private collection() {
//     return getDb().collection<Projects>("projects");
//   }

//   async create(data: Projects): Promise<Projects> {
//     const result = await this.collection().insertOne(data);

//     return {
//       _id: result.insertedId,
//       ...data,
//     };
//   }

//   async findById(id: string): Promise<Projects | null> {
//     return await this.collection().findOne({
//       _id: new ObjectId(id),
//     });
//   }

//   async findAll(): Promise<Projects[]> {
//     return await this.collection().find().toArray();
//   }

//   async findByUser(userId: string): Promise<Projects[]> {
//     return await this.collection()
//       .find({
//         members: new ObjectId(userId),
//         isActive: true
//       })
//       .toArray();
//   }

//   async addMember(projectId: string, userId: string) {
//     return await this.collection().updateOne(
//       { _id: new ObjectId(projectId) },
//       {
//         $addToSet: {
//           members: new ObjectId(userId),
//         },
//         $set: {
//           updatedAt: new Date(),
//         },
//       }
//     );
//   }

//   async update(projectId: string, data: Partial<Projects>) {
//     return await this.collection().updateOne(
//       { _id: new ObjectId(projectId) },
//       {
//         $set: {
//           ...data,
//           updatedAt: new Date(),
//         },
//       }
//     );
//   }

//   async delete(projectId: string) {
//     return await this.collection().updateOne(
//       { _id: new ObjectId(projectId) },
//       {
//         $set: {
//           isActive: false,
//           updatedAt: new Date(),
//         },
//       }
//     );
//   }
// }
import { ObjectId } from "mongodb";
import { getDb } from "../../config/database";
import { Projects } from "./projects.model";

export class ProjectsRepository {
  private collection() {
    return getDb().collection<Projects>("projects");
  }

  async create(data: Projects): Promise<Projects> {
    const result = await this.collection().insertOne(data);

    return {
      _id: result.insertedId,
      ...data,
    };
  }

  async findById(id: string): Promise<Projects | null> {
    return await this.collection().findOne({
      _id: new ObjectId(id),
    });
  }

  async findAll(): Promise<Projects[]> {
    return await this.collection().find().toArray();
  }

  async findByUser(userId: string): Promise<Projects[]> {
    return await this.collection()
      .find({
        members: new ObjectId(userId),
        isActive: true,
      })
      .toArray();
  }

  async addMember(projectId: string, userId: string) {
    return await this.collection().updateOne(
      { _id: new ObjectId(projectId) },
      {
        $addToSet: {
          members: new ObjectId(userId),
        },
        $set: {
          updatedAt: new Date(),
        },
      }
    );
  }

  async update(projectId: string, data: Partial<Projects>) {
    return await this.collection().updateOne(
      { _id: new ObjectId(projectId) },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      }
    );
  }

  async delete(projectId: string) {
    return await this.collection().updateOne(
      { _id: new ObjectId(projectId) },
      {
        $set: {
          isActive: false,
          updatedAt: new Date(),
        },
      }
    );
  }

  async findByIdWithUsers(projectId: string) {
    const result = await this.collection()
      .aggregate([
        {
          $match: {
            _id: new ObjectId(projectId),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "ownerData",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "members",
            foreignField: "_id",
            as: "membersData",
          },
        },
        {
          $unwind: {
            path: "$ownerData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            name: 1,
            description: 1,
            isActive: 1,
            createdAt: 1,
            updatedAt: 1,
            owner: {
              _id: "$ownerData._id",
              name: "$ownerData.name",
              email: "$ownerData.email",
              avatar: "$ownerData.avatar",
              role: "$ownerData.role",
              isActive: "$ownerData.isActive",
            },
            members: {
              $map: {
                input: "$membersData",
                as: "member",
                in: {
                  _id: "$$member._id",
                  name: "$$member.name",
                  email: "$$member.email",
                  avatar: "$$member.avatar",
                  role: "$$member.role",
                  isActive: "$$member.isActive",
                },
              },
            },
          },
        },
      ])
      .toArray();

    return result[0] ?? null;
  }

  async findAllWithUsers() {
    return await this.collection()
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "ownerData",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "members",
            foreignField: "_id",
            as: "membersData",
          },
        },
        {
          $unwind: {
            path: "$ownerData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            name: 1,
            description: 1,
            isActive: 1,
            createdAt: 1,
            updatedAt: 1,
            owner: {
              _id: "$ownerData._id",
              name: "$ownerData.name",
              email: "$ownerData.email",
              avatar: "$ownerData.avatar",
              role: "$ownerData.role",
              isActive: "$ownerData.isActive",
            },
            members: {
              $map: {
                input: "$membersData",
                as: "member",
                in: {
                  _id: "$$member._id",
                  name: "$$member.name",
                  email: "$$member.email",
                  avatar: "$$member.avatar",
                  role: "$$member.role",
                  isActive: "$$member.isActive",
                },
              },
            },
          },
        },
      ])
      .toArray();
  }

  async findByUserWithUsers(userId: string) {
    return await this.collection()
      .aggregate([
        {
          $match: {
            members: new ObjectId(userId),
            isActive: true,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "ownerData",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "members",
            foreignField: "_id",
            as: "membersData",
          },
        },
        {
          $unwind: {
            path: "$ownerData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            name: 1,
            description: 1,
            isActive: 1,
            createdAt: 1,
            updatedAt: 1,
            owner: {
              _id: "$ownerData._id",
              name: "$ownerData.name",
              email: "$ownerData.email",
              avatar: "$ownerData.avatar",
              role: "$ownerData.role",
              isActive: "$ownerData.isActive",
            },
            members: {
              $map: {
                input: "$membersData",
                as: "member",
                in: {
                  _id: "$$member._id",
                  name: "$$member.name",
                  email: "$$member.email",
                  avatar: "$$member.avatar",
                  role: "$$member.role",
                  isActive: "$$member.isActive",
                },
              },
            },
          },
        },
      ])
      .toArray();
  }
}