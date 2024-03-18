import { cookies } from "next/dist/client/components/headers";
import { prisma } from "./prisma";
import { Cart, Prisma } from "@prisma/client";
import { number } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export type CartWithProducts = Prisma.CartGetPayload<{
    include: { items: { include: { product: true } } }
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
    include: { product: true };
}>;

export type ShoppingCart = CartWithProducts & {
    size: number,
    subtotal: number,
}

export async function getCart(): Promise<ShoppingCart | null> {
    //? in cazul in care cookie-ul nu exista
    const localCartId = cookies().get("localCartId")?.value
    const cart = localCartId ?
        await prisma.cart.findUnique({
            where: { id: localCartId },
            //items= atributul items al modelului Cart din schema.prisma
            include: { items: { include: { product: true } } },
        })
        //daca localCartId lipseste se va returna null
        : null;

    if (!cart) {
        return null;
    }

    return {
        //... pt a "desface" obiectul de tip cart

        ...cart,
        //0= valoarea a lui item, acc-valoarea totala acumulata a item.quantity (poate avea orice nume in loc de acc)
        size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
        subtotal: cart.items.reduce(
            (acc, item) => acc + item.quantity * item.product.price, 0
        )

    }
}


export async function createCart(): Promise<ShoppingCart> {

    const session = await getServerSession(authOptions);

    //let newCart: Cart;

    const newCart = await prisma.cart.create({
        data: {},
    });

    //Note: Needs encryption+secure settings in real production app
    cookies().set("localCartId", newCart.id);

    //Nu merge,aici trebuie revenit
    if (session) {
        // newCart = await prisma.cart.create({
        //     data: { userId: session.user.id }
        // })
    }
    //Creez shopping cart anonim daca user-ul nu e logged in
    else {
        //    const newCart = await prisma.cart.create({
        //         data: {},
        //     });

        //     //Note: Needs encryption+secure settings in real production app
        //     cookies().set("localCartId", newCart.id);
    }



    return {
        ...newCart,
        items: [],
        size: 0,
        subtotal: 0
    }
}