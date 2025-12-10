import Category from "../Models/categoryModel.js";

export const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

export const addCategory = async (req, res) => {
  await Category.insertMany([
    { id: "tech", title: "Best Tech Group" },
    { id: "ent", title: "Best Entertainment Group" },
    { id: "sport", title: "Best Sport Channel" },
    { id: "Bot", title: "Best Bot Community" },
    { id: "Lifestyle", title: "Best Lifestyle channel" },
    { id: "Meme", title: "Best Meme channel" },
    { id: "Entertainment", title: "Best Entertainment channel" }
    
  ]);

  res.json({ message: "Categories inserted!" });
};
