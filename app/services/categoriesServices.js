import ConnectDB from "@/app/lib/db";
import Category from "@/app/lib/models/categories";

export const categoriesServices = {
    async getCategories() {
        await ConnectDB();
        const categories = await Category.find().lean();
        return JSON.parse(JSON.stringify(categories));
    },
    async getCategoryById(id) {
        await ConnectDB();
        const category = await Category.findById(id).lean();
        if (!category) {
            throw new AppError("Category not found", 404);
        }
        return JSON.parse(JSON.stringify(category));
    },
    async addCategory(data) {
        await ConnectDB();
        const { name, slug, image, description } = data;
        const category = new Category({ name, slug, image, description });
        await category.save();
        return JSON.parse(JSON.stringify({ success: true, category }));
    },
    async updateCategory(id, data) {
        await ConnectDB();
        const category = await Category.findByIdAndUpdate(id, data, { new: true }).lean();
        if (!category) {
            throw new AppError("Category not found", 404);
        }
        return JSON.parse(JSON.stringify({ success: true, category }));
    },
    async deleteCategory(id) {
        await ConnectDB();
        const category = await Category.findById(id).lean();
        if(category.image){
            await deleteImage(category.image);
        }
        await category.remove();
        if (!category) {
            throw new AppError("Category not found", 404);
        }
        return JSON.parse(JSON.stringify({ success: true, category }));
    },
}   