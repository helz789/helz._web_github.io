document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelectorAll('.nav-button[data-page]');
  const pages = document.querySelectorAll('.page');
  const contentArea = document.querySelector('.content-area');
  const articlePage = document.getElementById('article-page');
  const articleViews = document.querySelectorAll('.article-view');
  const articleCards = document.querySelectorAll('.article-card[data-article-target]');
  const backButton = document.querySelector('[data-role="back-home"]');
  const mainContent = document.querySelector('.main-content');

  // 切換主頁 / 興趣頁
  function showPage(pageName) {
    // 切換按鈕樣式
    navButtons.forEach(btn => {
      const targetPage = btn.dataset.page;
      btn.classList.toggle('active', targetPage === pageName);
    });

    // 顯示對應 page
    pages.forEach(section => {
      section.classList.toggle('active', section.id === `${pageName}-page`);
    });

    // 關掉文章頁，回到一般內容區
    articlePage.classList.remove('active');
    contentArea.style.display = 'flex';
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.dataset.page;
      showPage(page);
    });
  });

  // 開啟文章
  function openArticle(targetId) {
    // 先把所有文章關掉
    articleViews.forEach(view => {
      view.classList.toggle('active', view.id === targetId);
    });

    // 隱藏主內容區，改顯示文章頁
    contentArea.style.display = 'none';
    articlePage.classList.add('active');

    // 捲動到主內容頂部
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  }

  articleCards.forEach(card => {
    card.addEventListener('click', () => {
      const targetId = card.dataset.articleTarget;
      if (targetId) {
        openArticle(targetId);
      }
    });
  });

  // 返回首頁（回到目前 active 的主頁 tab）
  if (backButton) {
    backButton.addEventListener('click', () => {
      articlePage.classList.remove('active');
      contentArea.style.display = 'flex';

      // 回到 mainContent 頂部
      if (mainContent) {
        mainContent.scrollTop = 0;
      }
    });
  }

  // 預設顯示 home 頁
  showPage('home');
});
