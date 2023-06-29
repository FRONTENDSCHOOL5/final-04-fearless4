# 1번 리뷰 (정준영)
* 페이지 링크 : [Followings.jsx](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/blob/main/src/pages/follow/Followings.jsx)

* 범위 : 27 - 153 line

* 전체 개요
>팔로잉 된 페이지에서 유저를 팔로우 또는 언팔로우 하는 페이지입니다.
현재 팔로우 및 언팔로우를 할 때, 버튼의 변화속도가 눈에 띌 만큼 느립니다.
처음에는 단순히 팔로우 및 언팔로우를 할 때, 페이지 전체를 렌더링하면 되겠지하고 코드를 작성했더니,
언팔로우 할때마다 유저가 사라져서 (팔로잉된 유저만 표시해주기 때문에) 아래와 같이 작성했습니다.

* 기능 내용
```jsx
36 line
    const data = useMyProfile();
```
>서버에서 로그인한 사용자의 정보를 받아오는 커스텀 훅을 만들어서 상수 data에 저장했습니다.
사용자의 프로필도 팔로잉 페이지에 있을 경우, accountname을 비교하여 팔로우 및 언팔로우 버튼을 표시하지 않기 위함입니다.

```jsx
49 line
const updateFollowing = res.data.map((item) => ({
    ...item,
    isFollow: item.isfollow,
    setFollower(updateFollowing);
```
>api에서 response 데이터를 받았을 때 상수 updateFollowing에 response객체를 저장하면서 추가로 팔로우 되었는지에 대한 키값을 추가하였습니다.

```jsx
77 line
    const updateFollowing = [...follower];
    updateFollowing[index].isFollow = !follower[index].isFollow;
    setFollower(updateFollowing);
```
>추가한 이유는 isFollow 를 통해 값이 false이거나 true일 때 버튼의 변화를 주면서, 기존 response로 받은 데이터는 훼손시키지 않고, 임의로 추가한 isFollow
false이거나 true일 때 마다 서버와 통신을 하고 바뀐 isFollow 부분만 렌더링하기 위함입니다.
* 코드 리뷰에서 질문 드릴 점
>위 코드들로도 기능이 구현을 되는데, 버튼 바뀌는 속도가 느리고 전체적으로 이렇게까지 코드를 써야하는지에 대한 끊임없는 물음이 생겨났습니다. 버튼을 누르고 서버와 통신을 하기전에 버튼만 먼저 리렌더링되어 팔로우 <-> 언팔로우 변화가 있어야하는데, 1~2일의 시간을 들여도 잘 되지 않아 코드리뷰를 요청드립니다!


# 2번 리뷰 (강동훈)
* 페이지 링크 - [post.style.jsx](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/blob/main/src/components/post/post.style.jsx#L171)

✅ 범위:
- post.style.jsx 파일 155 ~ 288

✅ 전체 개요
- Post 컴포넌트는 게시글의 id를 props로 받아서 해당 게시글 컴포넌트를 렌더링합니다.
- 이와 같은 컨텐츠 전체에 해당하는 컴포넌트입니다.

![home-post](https://github.com/FRONTENDSCHOOL5/final-04-fearless4/assets/113353436/008135d2-379e-4da1-b57f-b14129d0854c)

✅ 기능 내용
- Post 컴포넌트는 다음과 같은 상태를 가지고 있습니다:
  - `postData`: 불러 온 게시글 데이터를 저장하기 위한 상태입니다.
  - `isHearted`: 좋아요 버튼의 클릭 여부를 저장하기 위한 상태입니다.
  - `heartCount`: 좋아요 갯수를 저장하기 위한 상태입니다.
  - `isLoading`: axios를 통한 요청이 잘 불러와졌는지를 확인하고 이후 컴포넌트 렌더링 작업을 진행하기 위한 분기점으로 사용되는 상태입니다.
  - `isPostModal`: 게시글의 우측 모달 버튼을 클릭했을 때 게시글의 삭제와 수정을 할 수 있는 모달을 띄우기 위한 상태입니다.
  - `isPostDeleteCheckModal`: isPostModal이 활성화 되어 있을 경우, 여기서 나타나는 삭제 버튼을 누를 때 게시글을 삭제할지 확인하는 모달을 위한 상태입니다.
  - `isReportModal`: 현재 로그인을 한 사용자와 게시글 작성자의 계정 이름이 다를 경우, 게시글의 우측 모달 버튼을 클릭했을 때 삭제와 수정이 아닌 신고하기 모달을 띄우기 위한 상태입니다.
  - `showPostDeleteToast`, showPostReportToast: 게시글이 삭제되거나 신고되었을 경우 이에 해당하는 Toast 알림을 위한 상태입니다.

- Post 컴포넌트는 다음과 같은 기능을 합니다:

  - `useEffect` 부분(170~191): 컴포넌트에서 사용하는 token과 postId가 바뀔 때 마다 서버에 게시글의 상세 정보에 대한 요청을 보냅니다. 요청이 성공할 경우 받아오는 데이터는 다음과 같습니다:
  - ```json
    // SUCCESS
    {
        "post": [
            {
                "id": "String",
                "content": "String",
                "image": "String",
                "createdAt": "String",
                "updatedAt": "String",
                "hearted": false,
                "heartCount": 0,
                "commentCount": 0,
                "author": {
                    "_id": "작성자 id",
                    "username": "2",
                    "accountname": "2",
                    "intro": "",
                    "image": "http://146.56.183.55:5050/Ellipse.png",
                    "isfollow": true,
                    "following": [],
                    "follower": [
                        "follower id"
                    ],
                    "followerCount": 1,
                    "followingCount": 0
                }
            }
        ]
    }
    ```

- `handleHeartClick` (193~227)

  - 좋아요 버튼을 클릭했을 때 onClick 이벤트로 실행되는 함수입니다.
  - `isHearted`로 좋아요의 활성화 여부를 확인하고, 만약 좋아요가 되지 않았다면 좋아요 요청을, 좋아요가 활성화 되어 있다면 좋아요 취소 요청을 보냅니다.

- `handlePostEditClick` (244~254)

  - 작성자가 게시글 모달을 클릭했을 때 수정 버튼을 누르면 게시글을 수정할 수 있는 페이지로 이동합니다.
  - 이때 `useNavigate`를 사용해 state로 게시글의 아이디와, 텍스트 내용, 이미지를 state로 게시글 수정 페이지에 전달합니다.

- `handlePostDeleteConfirmClick` (259~280)
  - 작성자가 게시글 모달을 클릭했을 때 삭제 버튼을 누르고 삭제 확인 창에서 삭제를 한번 더 눌렀을 때 실행됩니다.
  - 게시글 삭제 요청을 보내고, 활성화 되었던 모달 창을 비활성화하고 게시글이 삭제되었다는 Toast알림을 띄웁니다.

🙋🏻‍♂️ 코드 리뷰에서 궁금한 점

- 리뷰를 요청드린 코드 전체의 퀄리티에 대한 리뷰를 받고 싶습니다.
- 중복된 코드의 사용은 없는지, 컴포넌트의 이름이나 변수의 이름에 알아보기 어려운 것은 없는지, 어떻게 하면 axios 요청을 조금 더 공통적으로 보낼 수 있는지가 궁금합니다.



