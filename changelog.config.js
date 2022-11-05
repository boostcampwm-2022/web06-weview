module.exports = {
    disableEmoji: true,
    format: '{type}{scope}: {emoji}{subject}',
    list: ['feat', 'design','fix', 'test','setting', 'docs', 'refactor', 'style', 'ci', 'perform'],
    maxMessageLength: 64,
    minMessageLength: 3,
    questions: ['type', 'scope', 'subject', 'body', 'breaking', 'issues', 'lerna'],
    scopes: ['FE','BE',"DO"],
    types: {
        feat: {
            description: '기능 추가 및 수정',
            value: 'feat'
        },
        design: {
            description: '레이아웃 추가 및 수정',
            value: 'design'
        },
        fix: {
            description: '버그 수정',
            value: 'fix'
        },
        test: {
            description: '테스트 코드 추가 및 수정',
            value: 'test'
        },
        setting: {
            description: '환경 설정',
            value: 'setting'
        },
        docs: {
            description: '문서 추가 및 수정',
            value: 'docs'
        },
        refactor: {
            description: '코드 리팩토링',
            value: 'refactor'
        },
        style: {
            description: '주석, 프리티어 등 기능의 영향없이 코드의 모양새만 바뀌는 경우',
            value: 'style'
        },
        ci: {
            description: 'CI 관련 변경',
            value: 'ci'
        },
        perform: {
            description: '성능 변화를 목적으로 코드 추가 및 수정',
            value: 'perform'
        },
        messages: {
            type: '커밋 타입: 소문자 영단어로 작성\n',
            customScope: 'FE (클라이언트 관련 작업), BE (서버 관련 작업), DO (DevOps 관련 작업) 중 관련된 작업으로 작성\n',
            subject: '명령형으로 작성, 마침표로 끝나지 않음 커밋과 관련된 이슈 번호 작성\n',
            body: '커밋에 대한 내용 작성\n ',
            breaking: 'List any breaking changes:\n',
            footer: 'Issues this commit closes, e.g #123:',
            confirmCommit: 'The packages that this commit has affected\n',
        },
    }
};