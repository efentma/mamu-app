import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAll = async (req, res) => {
    try {
        const product = await prisma.products.findMany();
        res.status(200).json({message: 'All products', product})
    } catch (error) {
        res.status(500).json({error: 'Internal server error', product})
    }
}

export const findOne = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await prisma.products.findUnique({
            where: {
                id: productId
            }
        });
        if (!product) {
            return res.status(404).json({error: 'Product not found'})
        }
        res.status(200).json({message: 'Product available', product})
    } catch (error) {
        res.status(500).json({error: 'Internal server error'})
    }
}
export const createProduct = async (req, res) => {
    const {productName, price, amount} = req.body
    try {
        const product = await prisma.products.create({
            data: {
                product: productName,
                price: price,
                amount: amount
            }
        });
        res.status(201).json({message: 'Product created successfully', product})
    } catch (error) {
        res.status(500).json({error: 'Internal server error'})
    }
}

export const updateProduct = async (req, res) => {
    const productId = req.params.id
    const {productName, price, amount} = req.body
    try {
        const product = await prisma.products.update({
            where: {
                id: productId
            },
            data: {
                product: productName,
                price: price,
                amount: amount
            }
        });
        res.status(200).json({message: 'Product updated successfully', product})
    } catch (error) {
        res.status(400).json({error: 'Bad request'})
    }
}

export const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await prisma.products.delete({
            where: {
                id: productId
            }
        });
        res.status(200).json({message: 'Product deleted successfully'})
    } catch (error) {
        res.status(404).json({error: 'Product not found'})
    }
}