import { deleteCategories } from "../../Config/CategoryApi";
import Button from "@mui/material/Button";
import { FaTrashAlt } from "react-icons/fa";

const DeleteCategories = ({category, updateDeleteCategory}) => {
    const categoryId = category.categoryId;

    const handleDeleteCategory = async () => {    
        // Delete category by ID
        try {
            const response = await deleteCategories(categoryId);
            if(response.status !== 204){
                console.error("Error deleting category:", response);
                return;
            } else {
                console.log("Category deleted successfully");
                updateDeleteCategory();
            }
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    }
    return (
        <Button onClick={handleDeleteCategory}>
            <div className="icon">
                <FaTrashAlt />
            </div>
        </Button>
    )
}

export default DeleteCategories