import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})

        # Check Setup page
        await page.goto(f'file://{os.getcwd()}/docs/setup.html')
        await page.screenshot(path='screenshot_setup_v2.png')

        # Check Help page (to see the header margin)
        await page.click('#help-nav-icon')
        await asyncio.sleep(0.5) # wait for navigation/transition
        await page.screenshot(path='screenshot_help_v2.png')

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
