import React, { useState } from "react";
import { Filter } from "bad-words";
import { FaExclamationTriangle } from "react-icons/fa";

const Comments = ({ comments, onApprove, onDelete }) => {
    const [filteredComments, setFilteredComments] = useState([]);

    const filter = new Filter();

    // Detect bad words and categorize comments
    const checkComments = () => {
        const flaggedComments = comments.map((comment) => ({
            ...comment,
            hasProfanity: filter.isProfane(comment.text),
        }));
        setFilteredComments(flaggedComments);
    };

    // Run profanity check when the component loads
    React.useEffect(() => {
        checkComments();
    }, [comments]);

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>
            {filteredComments.length > 0 ? (
                <ul className="space-y-4">
                    {filteredComments.map((comment, index) => (
                        <li
                            key={index}
                            className={`p-4 rounded-md ${comment.hasProfanity
                                ? "bg-red-50 border-l-4 border-red-500"
                                : "bg-green-50 border-l-4 border-green-500"
                                }`}
                        >
                            <p className="text-gray-700 mb-2">
                                <strong>{comment.restaurantName}</strong>: {comment.text}
                            </p>
                            {comment.hasProfanity && (
                                <div>
                                    <p className="text-red-500 flex items-center mb-2">
                                        <FaExclamationTriangle className="mr-2" />
                                        This comment contains inappropriate language.
                                    </p>
                                    <div className="flex space-x-4">
                                        <button
                                            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                                            onClick={() => onApprove(comment)}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                            onClick={() => onDelete(comment)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No comments found.</p>
            )}
        </div>
    );
};

export default Comments;
