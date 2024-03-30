import { ReactNode } from "react";
import Authbar from "@/components/shared/Authbar";

export default function AdminLayout({children} : {children : ReactNode}){
    return(
        <section>
            <Authbar />
            {children}
        </section>
    )
}