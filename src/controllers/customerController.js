import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const viewProduct = async (req, res) => {
    try {
        const product = await prisma.products.findMany();
        res.status(200).json({message: 'Product available', product})
    } catch (error) {
        res.status(500).json({error: 'Internal server error'})
    }
}
export const buyProduct = async (req, res) => {
    const { productID, nama } = req.body;
    try {
        const newCustomer = await prisma.customer.create({
            data: {
                productId: productID,
                nama: nama,
                rewardPoint: 0
            }
        });

        const product = await prisma.products.findUnique({
            where: {
                id: productID
            }
        });
        if (!product) {
            return res.status(404).json({error: 'Product not found'})
        }

        if (product.amount === 0 ) {
            return res.status(400).json({error: 'Product out of stock'})
        }

        // update jumlah product pada tabel products dengan mengurangi satu jika berhasil di beli
        await prisma.products.update({
            where: {
                id: productID
            },
            data: {
                amount: {
                    decrement: 1
                }
            }
        });
        
        // menentukan reward poin yang didapatkan
        let rewardPoints = 0;
        const rewardType = product.price >= 20000? 'B' : 'A';
        
        if (rewardType === 'A') {
            rewardPoints = 20;
        } else {
            rewardPoints = 40;
        }

        // Menambahkan poin ke kolom rewardPoints di tabel customer
        await prisma.customer.update({
            where: {
                id: newCustomer.id
            },
            data: {
                rewardPoint: {
                    increment: rewardPoints
                }
            }
        });
        res.status(200).json({message: 'Product bought successfully', customerId: newCustomer.id, rewardPoints: rewardPoints})
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'})
    }
}