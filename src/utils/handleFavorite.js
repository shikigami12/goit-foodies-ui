import { toast } from "react-toastify";

const customId = "toastId";

const handleFavorite = async (funcName, recipeID, action, setFunc) => {
    try {
        await funcName(recipeID).unwrap();
        toast.success(`Recipe ${action === "add" ? "added to" : "deleted from"} favorites!`, {
            toastId: customId,
        });
        action === "add" ? setFunc(true) : setFunc(false);
    } catch (error) {
        console.error("Failed to add recipe to favorites: ", error);
    }
};

export default handleFavorite;