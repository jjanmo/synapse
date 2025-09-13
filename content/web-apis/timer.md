# 타이머 API

- setTimeout
- setInterval

## 예시 활용 사례

- 매초 선 그리기
  - 예: 지도 UI에서 경로 시각화
  - 예: 그래프 시각화

## 고려사항

1. 탭이 비활성화되었을 때 그리기를 일시 중지하고, 다시 활성화되었을 때 재개하는 방법
2. 탭이 비활성화된 상태에서도 매초 계속 그리기를 유지하는 방법

<details>
<summary>API 개요</summary>

Timer API는 시간 기반 작업을 처리합니다.

</details>

<details>
<summary>사용 예제</summary>

```javascript
setTimeout(() => {
  console.log('Hello!');
}, 1000);
```

</details>

<details>
<summary>⚠️ 브라우저 호환성</summary>

IE11에서는 지원되지 않습니다.

</details>
