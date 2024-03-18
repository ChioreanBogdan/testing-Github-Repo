//indica faptul ca e o componenta pt client side
"use client";

import { ComponentProps } from "react";
import { useFormStatus} from "react-dom";

type FormSubmitButtonProps= {
    children: React.ReactNode,
    className?: string,
                            } & ComponentProps<"button">
  //ComponentProps<"button"> pt a primi toate proprietatile unui buton normal                          

export default function FormSubmitButton(
    //...props catches all the props that are unnamed
    {children, className,...props} : FormSubmitButtonProps
                                        ) {
                                            //pt a arata incarcarea
                                            const {pending} = useFormStatus();

                                            return(
                                                <button
                                                {...props}
                                                className={`btn btn-primary ${className}`}
                                                type="submit"
                                                //ca sa se blocheze in loading
                                                disabled={pending}
                                                >
                                                    {pending && <span className="loading loading-spinner" /> }
                                                    {children}</button>
                                                  );
                                          };