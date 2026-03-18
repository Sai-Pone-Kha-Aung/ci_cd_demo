# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - heading "React Testing Demo" [level=1] [ref=e5]
    - paragraph [ref=e6]: Unit · Integration · E2E
  - main [ref=e7]:
    - generic [ref=e8]:
      - heading "Counter" [level=2] [ref=e9]
      - paragraph [ref=e10]: "0"
      - generic [ref=e11]:
        - button "−" [disabled] [ref=e12]
        - button "Reset" [ref=e13] [cursor=pointer]
        - button "+" [ref=e14] [cursor=pointer]
    - generic [ref=e15]:
      - heading "Todo List" [level=2] [ref=e16]
      - generic [ref=e17]:
        - textbox "New todo" [ref=e18]:
          - /placeholder: Add a new todo…
        - button "Add" [ref=e19] [cursor=pointer]
      - paragraph [ref=e20]: No todos yet. Add one above!
```