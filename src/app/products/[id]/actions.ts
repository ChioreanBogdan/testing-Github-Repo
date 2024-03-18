//server actions file
"use server"

import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function incrementProductQuantity(productId: string) {
    //?? -partea din dreapta ?? va fi executata daca ce e in partea stanga a ?? returneaza null
    const cart = (await getCart()) ?? (await createCart());

    const articleInCart = cart.items.find(item => item.productId === productId)

    if (articleInCart) {
        //Daca produsul e deja in cos,crestem cantitatea cu 1
        await prisma.cartItem.update({
            where: { id: articleInCart.id },
            data: { quantity: { increment: 1 } },
        })
    }
    else {
        //Daca nu e,il cream
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                // productId, = are aceeasi valoare cu argumentul functiei
                productId,
                quantity: 1,

            },
        });
    }

    //pt a da refresh la path
    revalidatePath("/products/[id]");
}