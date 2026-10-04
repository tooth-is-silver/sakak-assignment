# SAKAK Software Engineer (Frontend) 기술 과제

알고리즘 문제와 화면 구현 과제를 npm workspaces 기반 모노레포로 관리합니다.

## 과제

- [개미수열 알고리즘](./algorithm/README.md)
- [개인 맞춤형 건강 분석 대시보드](./web/README.md)

## 프로젝트 구성

```text
algorithm/  개미수열 알고리즘 과제
web/        건강검진 대시보드 과제
```

두 프로젝트는 의존성을 공유하지 않으며, 저장소 루트에서 `npm install`과 각 workspace 명령을 실행할 수 있습니다.
