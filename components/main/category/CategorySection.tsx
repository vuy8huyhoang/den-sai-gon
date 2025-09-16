import { ITEMS } from "../../../lib/data";
import CategoryGrid from "./CategoryGrid";

export default function CategorySection() {
    return (
        <section className="py-6">
            <div className="container-x">
                <CategoryGrid items={ITEMS} />
            </div>
        </section>
    )
}
