import db from '../../config/sequelize.js';

const { Category } = db;


export const createCategory = async (req, res) => {
  try {
    const { name, parentId } = req.body;

    const category = await Category.create({ name, parentId: parentId || null });
    res.status(201).json({ category });
  } catch (err) {
    console.error('Create category error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


const buildCategoryTree = (categories, parentId = null) => {
  return categories
    .filter(cat => cat.parentId === parentId)
    .map(cat => ({
      id: cat.id,
      name: cat.name,
      children: buildCategoryTree(categories, cat.id)
    }));
};


export const getAllCategories = async (req, res) => {
  try {
    const all = await Category.findAll({ raw: true });
    const tree = buildCategoryTree(all);
    res.status(200).json(tree);
  } catch (err) {
    console.error('Fetch category error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
