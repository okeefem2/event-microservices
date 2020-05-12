import React from 'react';

import './comment-list.scss';

/* eslint-disable-next-line */
export interface CommentListProps {
  comments: { id: string, content: string }[]
}

export const CommentList = ({ comments }: CommentListProps) => {

  const decideContent = (comment) => {
    switch (comment.status) {
      case 'pending':
        return 'Comment awaiting moderation';
      case 'approved':
        return comment.content;
      case 'rejected':
        return 'Comment rejected';
      default:
        return '';
    }
  }

  const renderedComments = comments ? comments.map(c => (
    <li key={c.id}>
      {decideContent(c)}
    </li>
  )): [ ];
  console.log(comments);
  return (
    <div className="content">
      <ul>
        {renderedComments}
      </ul>
    </div>
  );
};

export default CommentList;
