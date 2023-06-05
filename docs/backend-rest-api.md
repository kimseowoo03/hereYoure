# 백엔드 REST API Docs
API 문서는 백엔드 REST API의 구조와 사용법에 대한 자세한 설명을 제공합니다. 아래는 API 문서의 주요 내용입니다.

- API: [Swagger API 바로가기](https://port-0-hereyoure-api-17xqnr2llgtje1s5.sel3.cloudtype.app/api-docs/)
- API [Swagger UI.pdf](https://github.com/kimseowoo03/hereYoure/files/11634767/Swagger.UI.pdf)
- 폴더 구조: API의 폴더 구조 및 파일 설명

## API 이미지

<div align="center">
<img width="326" alt="스크린샷 2023-06-02 오후 3 52 31" src="https://github.com/kimseowoo03/hereYoure/assets/102151860/1a011e42-7ffd-40fa-9251-ba248924616b">
</div>

## Forder Structure

```
/api
    /group by function
        /controller : 최종 처리 로직.
            value.controller.ts
        /model : 사용하는 Database의 모델 형태를 정의하여 controller에서 사용할 수 있도록 한다.
            value.model.ts
        /router : api 요청에 대한 처리를 한다. (Express.Rouer 정의)
            value.router.ts
        /type : type setting (controller/repository/service에서 사용)
    index.router.ts : 전체 라우터를 한번에 모아서 export 한다
/bin
/db
    sequelize.config.ts : sequelize를 사용하기 위해 DB에 필요한 값을 세팅
/models
    /db-models.types.ts : database field types
    /result-model.types.ts : return result types
    /modules
    /public
    /utility : api 이외의 기능 정의
        /error : catch and message to error
        /utils : 사용 함수 모음
app.ts
type.d.ts
```