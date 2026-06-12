import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1440, 'height': 900})

        # Check Setup page
        await page.goto(f'file://{os.getcwd()}/docs/setup.html')
        await page.screenshot(path='final_setup.png')

        # Check Kickstarter page
        await page.click('.icon-item[data-target="kickstarter.html"]')
        await asyncio.sleep(0.5)
        await page.screenshot(path='final_kickstarter.png')

        # Check Help page
        await page.click('#help-nav-icon')
        await asyncio.sleep(0.5)
        await page.screenshot(path='final_help.png')

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
