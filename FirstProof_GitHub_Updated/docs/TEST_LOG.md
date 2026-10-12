# Mechanical test pass
Executed 8 October 2026 against first deploy candidate. See TEST_V1.txt: 17/18 passed.
Observed defect: the decision function allowed a second interview reservation for a session that already held one. Reproduce with state.reserved=true and three passing criteria: it incorrectly returned interview.
Fix: reject an already-reserved state before processing a new decision. This protects capacity against duplicate submissions.
Re-ran the same 18 checks after the fix: TEST_V2.txt, 18/18 passed. No test or bug result is fabricated. Syntax checks also passed.
Browser visual/interaction QA was unavailable under the Sites managed environment workflow: the required control-browser skill is not exposed. No browser screenshots or fresh-chat persona results are claimed. Native deployment confirms publication, not browser usability.
