describe("LogIn and LogOut Scenario", () => {
  it("should redirect to github correctly", () => {
    cy.visit("/");
    cy.window().then(($win) => {
      cy.stub($win, "open", (url: any) => {
        $win.location.href = url;
      }).as("popup");
      cy.get("[data-cy=login-btn]").click();
      cy.get("@popup").should("be.called");
      cy.get("p").contains("GitHub");
      cy.get(".btn").click();
    });
  });

  it("click btn to login and click image to logout", () => {
    /**
     *     현재 로컬에서 한번 로그인 돼있는 것을 전제로 테스트
     *     팝업 window에 새로운 id, 비밀번호 삽입하는 시나리오는 test 되지 않음 (현재 cypress double 탭을 지원하지 않는다.)
     *     https://docs.cypress.io/guides/references/trade-offs  There will never be support for multiple browser tabs.
     */
    cy.visit("/");
    cy.get("[data-cy=login-btn]").click();
    cy.intercept("/api**/").then(() => {
      cy.get(".user-profile", { timeout: 30000 });
    });
    cy.get(".user-profile").click();
    cy.get("[data-cy=login-btn]");
  });
});

export {};
