import prisma from "../config/prisma.js";


// Create a new category
export const createCategory = async (req, res) => {
    try{
        const {name, color, icon} = req.body;
        const userId = req.user.id;


        const category = await prisma.category.create({
            data:{name, color, icon, userId}
        });
        res.json({message: "Category created successfully", category});
    } catch (err){
        res.status(500).json({err: err.message});
    }
};

// Get All User categories
export const getCategories = async (req, res) => {
    try{
        const userId = req.user.id;
        const categories = await prisma.category.findMany({
            where:{userId},
            orderBy:{name: 'asc'}
        });
        res.json({categories});
    } catch (err){
        res.status(500).json({err: err.message});
    }
}

// Update a category
export const updateCategory = async (req, res)=>{
    try{
        const {id} = req.params;
        const {name, color, icon} = req.body;
        const update = await prisma.category.update({
            where:{id},
            data:{name, color, icon}
        });
        res.json({message: "Category updated successfully", update});
    }catch (err){
        res.status(500).json({err: err.message});
    }
}

// delete category
export const deleteCategory = async (req, res)=>{
    try {
        const {id} = req.params;
        await prisma.category.delete({
            where:{id}
        });
        res.json({message: "Category deleted successfully"});
    } catch (err) {
        res.status(500).json({err: err.message});
    }
}