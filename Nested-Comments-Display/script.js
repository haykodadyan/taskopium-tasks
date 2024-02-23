const comments = [
  {
    id: 1,
    text: "This is the first comment",
    parentId: null,
    replies: [
      {
        id: 2,
        text: "This is a reply to the first comment",
        parentId: 1,
        replies: [
          {
            id: 3,
            text: "This is a nested reply",
            parentId: 2,
            replies: []
          }
        ]
      }
    ]
  },
  {
    id: 4,
    text: "This is an independent comment",
    parentId: null,
    replies: []
  },
  {
    id: 5,
    text: "This is the third comment",
    parentId: null,
    replies: [
      {
        id: 6,
        text: "This is a reply to the third comment",
        parentId: 5,
        replies: [
          {
            id: 7,
            text: "This is a 2x reply",
            parentId: 6,
            replies: [
              {
                id: 8,
                text: "This is a 3x reply",
                parentId: 7,
                replies: [
                  {
                    id: 9,
                    text: "This is a 4x reply",
                    parentId: 8,
                    replies: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 10,
        text: "This is also a reply to the third comment",
        parentId: 5,
        replies: [
          {
            id: 11,
            text: "This is a reply to a second reply of third comment",
            parentId: 10,
            replies: []
          }
        ]
      }
    ]
  },
];

const container = document.getElementById('container');

function commentGenerator(comment, nestLevel) {
  const commentItem = document.createElement('li');
  const commentDiv = document.createElement('div');
  commentDiv.className = 'comment';
  commentDiv.style.marginLeft = `${!nestLevel ? '0px' : '20px'}`;

  const commentText = document.createElement('p');
  commentText.textContent = comment.text;
  commentDiv.appendChild(commentText);

  if (comment.replies.length) {
    const replyList = document.createElement('ul');
    comment.replies.forEach(reply => {
      const replyItem = commentGenerator(reply, 1);
      replyList.appendChild(replyItem);
    });
    commentDiv.appendChild(replyList);
  }

  commentItem.appendChild(commentDiv);
  return commentItem;
}

function commentDisplay(commentsArray) {
  const commentList = document.createElement('ul');
  commentsArray.forEach(comment => {
    const commentItem = commentGenerator(comment, 0);
    commentList.appendChild(commentItem);
  });
  container.appendChild(commentList);
}

commentDisplay(comments);