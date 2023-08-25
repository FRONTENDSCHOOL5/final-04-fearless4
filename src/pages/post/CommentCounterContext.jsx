import React, { createContext, useState, useContext } from 'react';

const CommentCountContext = createContext({
	commentCount: 0,
	setCommentCount: () => {},
});

export const CommentCountProvider = ({ children }) => {
	const [commentCount, setCommentCount] = useState(0);

	return (
		<CommentCountContext.Provider value={{ commentCount, setCommentCount }}>
			{children}
		</CommentCountContext.Provider>
	);
};

export const useCommentCount = () => {
	return useContext(CommentCountContext);
};
