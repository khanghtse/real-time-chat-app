import connectDatabase from "../configs/database.config";
import UserModel from "../models/user.model"



export const CreateWhopAI = async () => {
    const existingAI = await UserModel.findOne({ isAI: true});
    if (existingAI) {
        await UserModel.deleteOne({ _id: existingAI._id });
    }
    const whopAI = await UserModel.create({
        name: "Whop AI",
        isAI: true,
        avatar: "https://res.cloudinary.com/dret7pl7j/image/upload/v1763022607/whop-ai-logo_gqgcwy.png"
    });
    console.log("WhopAI created", whopAI);
    return whopAI;
};

const seedWhopAI = async () => {
    try {
        await connectDatabase();
        await CreateWhopAI();
        console.log("Seed completed");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedWhopAI();