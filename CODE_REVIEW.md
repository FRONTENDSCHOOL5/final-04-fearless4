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
