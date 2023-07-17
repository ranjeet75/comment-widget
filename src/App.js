import { useState } from "react";
import Comment from "./component/Comment";
import useNode from "./hooks/useNode";
import "./App.css";

const comments = {
    id: 1,
    items: [],
};
const App = () => {
    const [commentsData, setCommentsData] = useState(comments);

    const { insertNode, deleteNode } = useNode();

    const handleInsertNode = (folderId, item) => {
        const finalStructure = insertNode(commentsData, folderId, item);
        setCommentsData(finalStructure);
    };

    const handleDeleteNode = (folderId) => {
        const finalStructure = deleteNode(commentsData, folderId);
        const temp = { ...finalStructure };
        setCommentsData(temp);
    };

    return (
        <div className="App">
            <Comment
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                comment={commentsData}
            />
        </div>
    );
};

export default App;
