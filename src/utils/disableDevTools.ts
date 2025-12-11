/**
 * 개발자 도구 접근 방지 유틸리티
 *
 * 주의: 완전한 차단은 불가능하며, 기본적인 방지 기법만 적용됩니다.
 * 숙련된 사용자는 여전히 개발자 도구에 접근할 수 있습니다.
 */

export function disableDevTools() {
  // 개발자 도구 감지 함수
  const detectDevTools = () => {
    const threshold = 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;

    if (widthThreshold || heightThreshold) {
      // 개발자 도구가 열린 것으로 감지되면 페이지 닫기
      document.body.innerHTML = "";
      window.location.href = "about:blank";
    }
  };

  // 주기적으로 개발자 도구 감지
  setInterval(detectDevTools, 500);

  // F12 키 비활성화
  document.addEventListener(
    "keydown",
    (e) => {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+Shift+I (Chrome DevTools)
      if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+Shift+J (Chrome Console)
      if (e.ctrlKey && e.shiftKey && e.key === "J") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+Shift+C (Chrome Inspect)
      if (e.ctrlKey && e.shiftKey && e.key === "C") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+S (Save Page)
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    },
    true
  );

  // 우클릭 방지
  document.addEventListener(
    "contextmenu",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    },
    true
  );

  // 텍스트 선택 방지
  document.addEventListener(
    "selectstart",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    },
    true
  );

  // 드래그 방지
  document.addEventListener(
    "dragstart",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    },
    true
  );

  // 개발자 도구 콘솔 감지
  const devtools = {
    open: false,
    orientation: null as string | null,
  };

  const checkDevTools = () => {
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;

    if (widthThreshold || heightThreshold) {
      if (!devtools.open) {
        devtools.open = true;
        // 개발자 도구가 열렸을 때 처리
        document.body.innerHTML = "";
        window.location.href = "about:blank";
      }
    } else {
      devtools.open = false;
    }
  };

  // 주기적으로 체크
  setInterval(checkDevTools, 500);

  // 콘솔 오버라이드 (선택적 - 필요시 주석 해제)
  // const noop = () => {};
  // const methods = ['log', 'debug', 'info', 'warn', 'error', 'assert', 'dir', 'dirxml', 'group', 'groupEnd', 'time', 'timeEnd', 'count', 'trace', 'profile', 'profileEnd'];
  //
  // methods.forEach((method) => {
  //   if ((window.console as any)[method]) {
  //     (window.console as any)[method] = noop;
  //   }
  // });

  // debugger 문 감지
  const originalDebugger = window.debugger;
  window.debugger = function () {
    // debugger 호출 시 아무것도 하지 않음
  };

  // 개발자 도구 감지를 위한 추가 체크
  let devtoolsOpen = false;
  const element = new Image();
  Object.defineProperty(element, "id", {
    get: function () {
      devtoolsOpen = true;
      checkDevTools();
      return "";
    },
  });

  setInterval(() => {
    devtoolsOpen = false;
    console.log(element);
    if (devtoolsOpen) {
      document.body.innerHTML = "";
      window.location.href = "about:blank";
    }
  }, 1000);
}
