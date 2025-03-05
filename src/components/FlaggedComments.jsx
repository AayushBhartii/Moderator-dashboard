import React from "react";
import PropTypes from "prop-types";

export default function FlaggedComments({ allUsers, onApprove, onDelete }) {
    // Collect all flagged comments from all users
    const flaggedComments = (allUsers || [])
        .flatMap((user) =>
            (user.comments || []).map((comment) => ({ ...comment, user }))
        )
        .filter((comment) => comment.user?.flagged);

    return (
        <div>
            <h3 className="text-xl font-bold mb-4">Flagged Comments</h3>
            {flaggedComments.length === 0 ? (
                <p className="text-gray-500">No flagged comments available.</p>
            ) : (
                <ul className="space-y-4">
                    {flaggedComments.map((comment, index) => (
                        <li
                            key={index}
                            className="border p-4 rounded-lg shadow-sm bg-gray-50 flex justify-between items-start"
                        >
                            <div>
                                <p className="text-sm text-gray-500">
                                    <strong>User:</strong> {comment.user.name} (@{comment.user.username})
                                </p>
                                <p className="mt-2">{comment.text}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    <strong>Restaurant:</strong> {comment.restaurantName}
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 ml-4">
                                <button
                                    onClick={() => onApprove(comment)}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => onDelete(comment)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

// Type checking with PropTypes
FlaggedComments.propTypes = {
    allUsers: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            username: PropTypes.string,
            flagged: PropTypes.bool,
            comments: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string,
                    restaurantName: PropTypes.string,
                })
            ),
        })
    ),
    onApprove: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};
