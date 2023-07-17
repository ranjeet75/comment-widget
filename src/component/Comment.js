import { useState, useRef } from "react";
import Action from "./Action";

const Comment = ({ handleInsertNode, handleDeleteNode, comment }) => {
    const [input, setInput] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [expand, setExpand] = useState(false);
    const inputRef = useRef(null);

    const handleNewComment = () => {
        setExpand(!expand);
        setShowInput(true);
    };

    const onAddComment = () => {
        setExpand(true);
        handleInsertNode(comment.id, input);
        setShowInput(false);
        setInput("");
    };

    const handleDelete = () => {
        handleDeleteNode(comment.id);
    };

    return (
        <div>
            <div className={comment.id === 1 ? "inputContainer" : "commentContainer"}>
                {comment.id === 1 ? (
                    <div className="widget_container">
                        <div className="widget_heading">Comment Widget
                            <input
                                type="text"
                                className="inputContainer__input first_input"
                                autoFocus
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="type..."
                            />
                        </div>

                        <Action
                            className="reply comment"
                            type="COMMENT"
                            handleClick={onAddComment}
                        />
                    </div>
                ) : (
                    <>
                        <span
                            ref={inputRef}
                            style={{ wordWrap: "break-word" }}
                        >
                            {comment.name}
                        </span>

                        <div style={{ display: "flex" }}>

                            <>
                                <Action
                                    className="reply"
                                    type="REPLY"
                                    handleClick={handleNewComment}
                                />
                                <Action
                                    className="delete"
                                    type="DELETE"
                                    handleClick={handleDelete}
                                />
                            </>
                        </div>
                    </>
                )}
            </div>

            <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
                {showInput && (
                    <div className="inputContainer">
                        <input
                            type="text"
                            className="inputContainer__input"
                            autoFocus
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Action className="reply" type="REPLY" handleClick={onAddComment} />
                        <Action
                            className="reply"
                            type="CANCEL"
                            handleClick={() => {
                                setShowInput(false);
                                if (!comment?.items?.length) setExpand(false);
                            }}
                        />
                    </div>
                )}

                {comment?.items?.map((cmnt) => {
                    return (
                        <Comment
                            key={cmnt.id}
                            handleInsertNode={handleInsertNode}
                            handleDeleteNode={handleDeleteNode}
                            comment={cmnt}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Comment;
