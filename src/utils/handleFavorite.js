import toast from "react-hot-toast";

const customId = "favorite-toast";

const handleFavorite = async (funcName, recipeID, action, setFunc) => {
    try {
        await funcName(recipeID);

        toast.success(
            `Recipe ${action === "add" ? "added to" : "removed from"} favorites!`,
            { id: customId }
        );

        setFunc(action === "add");
    } catch (error) {
        if (error?.response?.data?.message === "Recipe already in favorites") {
            toast("Recipe is already in your favorites!", { id: customId });
        } else {
            toast.error(
                `Failed to ${action === "add" ? "add to" : "remove from"} favorites`,
                { id: customId }
            );
        }
    }
};

export default handleFavorite;
