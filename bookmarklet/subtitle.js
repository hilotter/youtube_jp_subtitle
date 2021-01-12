(async () => {
  const subtitleLabel = "字幕";
  const autoTranslationLabel = "自動翻訳";
  const subtitleLanguage = "日本語";

  const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

  const closeMenu = () => {
    document.querySelector("#player-container").click();
  };

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

  const subtitleList = document.querySelectorAll(".ytp-menuitem");
  const officialJapaneseSubtitle = Array.from(subtitleList).filter((item) => {
    return item.querySelector(".ytp-menuitem-label").textContent === subtitleLanguage;
  })[0];

  if (officialJapaneseSubtitle) {
    officialJapaneseSubtitle.click();
    closeMenu();
    return;
  }

  const autoTranslation = Array.from(subtitleList).filter((item) => {
    return item.querySelector(".ytp-menuitem-label").textContent === autoTranslationLabel;
  })[0];

  if (!autoTranslation) {
    closeMenu();
    return;
  }

  autoTranslation.click();
  await sleep(500);

  Array.from(document.querySelectorAll(".ytp-menuitem"))
    .filter((item) => {
      return item.querySelector(".ytp-menuitem-label").textContent === subtitleLanguage;
    })[0]
    .click();
  closeMenu();
})();
