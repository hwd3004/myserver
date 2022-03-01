https://helloinyong.tistory.com/265 - [2020.03.14] Express + GraphQL API 기본적인 Apollo서버 구현 (with TypeScript)

---

prisma 설치 과정 변경

npm i -D prisma

npx prisma generate - @prisma/client 생성

---

rd -r -fo uploads; mkdir uploads

---

https://www.regexpal.com/

```javascript
/#[\w]+/g;
// # 기호로 시작하는 단어

/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g;
// # 기호로 시작하는 영어+한글
```

---

타입스크립트로 개발 중에 파일 업로드 시 서버 멈추는 현상이 생겨서, 파일이 업로드 되는 경로를 제외시킴

```json
{
  "exclude": ["uploads"],
  "compilerOptions": {
    // ...
  }
}
```

---

https://www.apollographql.com/docs/react/networking/authentication/#header

---

https://velog.io/@khw970421/CORS-완전-정복하기

---
