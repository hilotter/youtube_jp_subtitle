(async () => {
  const subtitleLabel = "字幕";
  const subtitleLanguage = "日本語";

  const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

  const subtitle = document.querySelector(".ytp-subtitles-button");
  if (subtitle.style.display === "none") {
    return;
  }

  if (subtitle.ariaPressed !== "true") {
    subtitle.click();
    await sleep(500);
  }

  document.querySelector(".ytp-settings-button").click();
  await sleep(500);

  const subtitleLabelRegExp = new RegExp(String.raw`${subtitleLabel}`);
  Array.from(document.querySelectorAll(".ytp-menuitem"))
    .filter((item) => {
      return item.querySelector(".ytp-menuitem-label").textContent.match(subtitleLabelRegExp);
    })[0]
    .click();
  await sleep(500);

  document.querySelectorAll(".ytp-menuitem")[2].click();
  await sleep(500);

  Array.from(document.querySelectorAll(".ytp-menuitem"))
    .filter((item) => {
      return item.querySelector(".ytp-menuitem-label").textContent === subtitleLanguage;
    })[0]
    .click();
})();
