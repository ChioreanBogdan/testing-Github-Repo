"use server"

import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function setProductQuantity(productId: string, quantity: number) {
    //?? -partea din dreapta ?? va fi executata daca ce e in partea stanga a ?? returneaza null
    const cart = (await getCart()) ?? (await createCart());

    const articleInCart = cart.items.find(item => item.productId === productId);

    //Cazul: cantitatea e 0 si articolul e in cos: vrem sa il stergem
    if (quantity === 0) {
        if (articleInCart) {
            await prisma.cartItem.delete({
                where: { id: articleInCart.id }
            })
        }
    } else {
        if (articleInCart) {
            await prisma.cartItem.update({
                where: { id: articleInCart.id },
                data: { quantity }
            })
        }
        else {
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    quantity,

                }
            })
        }

    }

    revalidatePath("/cart");
}