import menCategory from "../assets/men-category.png"
import womenCategory from "../assets/women-category.png"
import accessoriesCategory from "../assets/accessories-category.png"
import kidsCategory from "../assets/kids-category.png"

export default function EditorsPick() {
    const categories = [
        {
            id: 1,
            title: "MEN",
            image: menCategory,
        },
        {
            id: 2,
            title: "WOMEN",
            image: womenCategory,
        },
        {
            id: 3,
            title: "ACCESSORIES",
            image: accessoriesCategory,
        },
        {
            id: 4,
            title: "KIDS",
            image: kidsCategory,
        }
    ]

    return (
        <section className="py-10 px-10 md:px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-xl md:text-xl font-bold text-gray-600 mb-4">
                        EDITOR'S PICK
                    </h2>
                    <p className="text-sm text-gray-500 max-w-md mx-auto">
                        Problems trying to resolve the conflict between
                    </p>
                </div>

                {/* Categories - Flex Layout Only */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-6 md:h-[500px] xl:h-[500px]">
                    {/* MEN - Mobile: twice height, Desktop: 2x width */}
                    <div className="md:flex-[2]">
                        <div className="relative group cursor-pointer overflow-hidden h-[512px] md:h-full">
                            <img
                                src={categories[0].image}
                                alt={categories[0].title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                            <div className="absolute bottom-6 left-6">
                                <div className="bg-white px-6 py-3 shadow-lg">
                                    <span className="text-gray-900 font-bold text-sm tracking-wide">
                                        {categories[0].title}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* WOMEN - Mobile: twice height, Desktop: 1x width */}
                    <div className="md:flex-1">
                        <div className="relative group cursor-pointer overflow-hidden h-[512px] md:h-full">
                            <img
                                src={categories[1].image}
                                alt={categories[1].title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                            <div className="absolute bottom-6 left-6">
                                <div className="bg-white px-6 py-3 shadow-lg">
                                    <span className="text-gray-900 font-bold text-sm tracking-wide">
                                        {categories[1].title}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ACCESSORIES & KIDS - Desktop: 1x width total, stacked vertically */}
                    <div className="md:flex-1 flex flex-col gap-4 md:h-full md:max-h-[500px] md:overflow-hidden">
                        {/* ACCESSORIES */}
                        <div className="flex-1 md:max-h-[246px] md:overflow-hidden">
                            <div className="relative group cursor-pointer overflow-hidden h-[256px] md:h-full">
                                <img
                                    src={categories[2].image}
                                    alt={categories[2].title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                                <div className="absolute bottom-6 left-6">
                                    <div className="bg-white px-6 py-3 shadow-lg">
                                        <span className="text-gray-900 font-bold text-sm tracking-wide">
                                            {categories[2].title}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* KIDS */}
                        <div className="flex-1 md:max-h-[246px] md:overflow-hidden">
                            <div className="relative group cursor-pointer overflow-hidden h-[256px] md:h-full">
                                <img
                                    src={categories[3].image}
                                    alt={categories[3].title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                                <div className="absolute bottom-6 left-6">
                                    <div className="bg-white px-6 py-3 shadow-lg">
                                        <span className="text-gray-900 font-bold text-sm tracking-wide">
                                            {categories[3].title}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
