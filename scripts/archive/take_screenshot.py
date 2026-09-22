from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 390, "height": 844})
    page.goto("https://hurremsultan-menu.vercel.app/")
    page.wait_for_timeout(3000) # Wait for animations
    page.screenshot(path=r"c:\Users\oarsl\.gemini\antigravity-ide\brain\f7ecb0df-49a4-479f-8306-f3472f2700bb\screenshot.png")
    browser.close()
print("Screenshot taken!")
