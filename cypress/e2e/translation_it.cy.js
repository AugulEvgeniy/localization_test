let specFilename = Cypress.spec.name;

// Match language code from format like 'translation-pt-br.cy.js'
const languageCode = specFilename.match(/translation_(.*)\.cy\.js/)[1]

// Store for later use in the test
const currentLanguage = languageCode; // e.g., "pt-br"

describe('League translations', () => {
  it('should verify league button translations', () => {
    cy.visit(`http://highlight.spinberry.com/applepen/SOTD_GoldenGoals/index.html?go=dev&serverAddress=https://riw-dev.olsworth.com&productId=goldenmulti85-dev&token=123456&currency=GBP&lang=${currentLanguage}&testConfig=local&forceDevice=tablet&hideCurrency=false`);
    
    cy.window().should((win) => {
      const game = win.game;
      const scene = game?.scene?.scenes?.[2];
      expect(scene?.loadingPanel?.list?.[1]?.list?.[0]).to.exist; // England button
    })


    cy.fixture('translations.json').then((translations) => {
      // Function to verify a league button translation
      const verify = (leagueKey, panelIndex, listIndex) => {
        const leagueTranslation = translations.find(item => 
          item["Section key"] === "LOADING" && 
          item.Key === leagueKey
        );

        if (!leagueTranslation) {
          throw new Error(`Translation not found for ${leagueKey} in ${lang}`)
        };

        const expectedRaw = leagueTranslation[lang]
        
        // Clean up expected translation
        const expectedCleaned = expectedRaw
          .replace(/[\r\n]+/g, ' ') // replace newlines with space
          .replace(/\s+/g, ' ')     // collapse multiple spaces
          .trim();
        
        const expectedWords = expectedCleaned.split(' ');
        
        cy.window().then((win) => {
          const actualRaw = win.game.scene.scenes[2].loadingPanel.list[panelIndex].list[listIndex].text;
          
          // Clean actual text too (optional, if needed)
          const actualCleaned = actualRaw
            .replace(/[\r\n]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          
          const matchedWords = expectedWords.filter(word => actualCleaned.includes(word));
          
          // ✅ Log expected & actual
          cy.log(`🌐 [${leagueKey}] Expected: ${expectedCleaned}`);
          cy.log(`🎮 Actual: ${actualCleaned}`);
          cy.log(`✅ Matched ${matchedWords.length} of ${expectedWords.length} words`);
          
          console.log(`[${leagueKey}] Expected:`, expectedCleaned);
          console.log(`Actual:`, actualCleaned);
          console.log(`Matched Words:`, matchedWords);

          if (matchedWords.length < 2) { // Your threshold
            console.log(`All translations for ${leagueKey}:`, leagueTranslation);
            cy.log(`All translations for ${leagueKey}:`, leagueTranslation);
          }
          
          expect(matchedWords.length).to.be.gte(2); // or adjust based on your thresholdh
        });
      }

      // Verify England league button (panelIndex 1, listIndex 1)
      verify('ENGLAND_LEAGUE', 1, 1);
      
      // Verify Italy league button (panelIndex 2, listIndex 1)
      verify('ITALY_LEAGUE', 2, 1);

      // Verify Italy league button (panelIndex 3, listIndex 1)
      verify('TURKEY_LEAGUE', 3, 1);

    });
  });
});


describe('Progress bar translations', () => {
  it('should verify progress bar translations', () => {
  
    cy.window().should((win) => {
      const game = win.game;
      const scene = game?.scene?.scenes?.[2];
      expect(scene?.loadingPanel?.list?.[1]?.list?.[0]).to.exist; // England button
    });

    cy.window().then((win) => {
      const game = win.game;
      game.scene?.scenes[2].loadingPanel?.list?.[6]?.list?.[0].emit('pointerdown')
    });


    cy.fixture('translations.json').then((translations) => {
      // Function to verify progress bar translation
      const verify = (progressKey, panelIndex) => {
        const progressTranslation = translations.find(item => 
          item["Section key"] === "LOADING" && 
          item.Key === progressKey
        );

        if (!progressTranslation) {
          throw new Error(`Translation not found for ${progressKey} in ${lang}`);
        }

        const expectedRaw = progressTranslation[lang];
        
        // Clean up expected translation
        const expectedCleaned = expectedRaw
          .replace(/[\r\n]+/g, ' ') // replace newlines with space
          .replace(/\s+/g, ' ')     // collapse multiple spaces
          .trim();
        
        const expectedWords = expectedCleaned.split(' ');
        
        cy.window().then((win) => {
          const actualRaw = win.game.scene.scenes[2].progressBar.list[panelIndex].text;
          
          // Clean actual text too (optional, if needed)
          const actualCleaned = actualRaw
            .replace(/[\r\n]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          
          const matchedWords = expectedWords.filter(word => actualCleaned.includes(word));
          
          // ✅ Log expected & actual
          cy.log(`🌐 [${progressKey}] Expected: ${expectedCleaned}`);
          cy.log(`🎮 Actual: ${actualCleaned}`);
          cy.log(`✅ Matched ${matchedWords.length} of ${expectedWords.length} words`);
          
          console.log(`[${progressKey}] Expected:`, expectedCleaned);
          console.log(`Actual:`, actualCleaned);
          console.log(`Matched Words:`, matchedWords);

          if (matchedWords.length < 2) { // Your threshold
            console.log(`All translations for ${progressKey}:`, progressTranslation);
            cy.log(`All translations for ${progressKey}:`, progressTranslation);
          }
          
          expect(matchedWords.length).to.be.gte(2); // or adjust based on your threshold
        });
      };

      // Verify object translation (panelIndex 1)
      verify('LOADING', 9);

    });
  });
});


describe('Stake translations', () => {
  it('should verify main page translations', () => {
  
    cy.window().should((win) => {
      const game = win.game;
      const main_scene = game?.scene?.scenes?.[1];
      const playButton = main_scene?.gameContainer.list?.[3]?.list?.[0].list?.[0];
    
      expect(playButton).to.exist;
    });


    cy.fixture('translations.json').then((translations) => {
      // Function to verify translation
      const verify = (Key, panelIndex, listIndex) => {
        const Translation = translations.find(item => 
          item["Section key"] === "STAKE" && 
          item.Key === Key
        );

        if (!Translation) {
          throw new Error(`Translation not found for ${Key} in ${lang}`);
        }

        const expectedRaw = Translation[lang];
        
        // Clean up expected translation
        const expectedCleaned = expectedRaw
          .replace(/[\r\n]+/g, ' ') // replace newlines with space
          .replace(/\s+/g, ' ')     // collapse multiple spaces
          .trim();
        
        const expectedWords = expectedCleaned.split(' ');
        
        cy.window().then((win) => {
          const actualRaw = win.game.scene.scenes[1].gameContainer.list[panelIndex].list[listIndex].text;
          
          // Clean actual text too (optional, if needed)
          const actualCleaned = actualRaw
            .replace(/[\r\n]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          
          const matchedWords = expectedWords.filter(word => actualCleaned.includes(word));
          
          // ✅ Log expected & actual
          cy.log(`🌐 [${Key}] Expected: ${expectedCleaned}`);
          cy.log(`🎮 Actual: ${actualCleaned}`);
          cy.log(`✅ Matched ${matchedWords.length} of ${expectedWords.length} words`);
          
          console.log(`[${Key}] Expected:`, expectedCleaned);
          console.log(`Actual:`, actualCleaned);
          console.log(`Matched Words:`, matchedWords);

          if (matchedWords.length < 2) { // Your threshold
            console.log(`All translations for ${Key}:`, Translation);
            cy.log(`All translations for ${Key}:`, Translation);
          }
          
          expect(matchedWords.length).to.be.gte(2); // or adjust based on your threshold
        });
      };

      // Verify object translation (panelIndex 1)
      verify('SELECT_STAKE', 3, 17);
      verify('INFO_WIDGET', 3, 4);

    });
  });
});


describe('Footer translations', () => {
  it('should verify footer translations', () => {

    cy.fixture('translations.json').then((translations) => {
      // Function to verify translation
      const verify = (Key, panelIndex, listIndex) => {
        const Translation = translations.find(item => 
          item["Section key"] === "BOTTOM" && 
          item.Key === Key
        );

        if (!Translation) {
          throw new Error(`Translation not found for ${Key} in ${lang}`);
        }

        const expectedRaw = Translation[lang];
        
        // Clean up expected translation
        const expectedCleaned = expectedRaw
          .replace(/[\r\n]+/g, ' ') // replace newlines with space
          .replace(/\s+/g, ' ')     // collapse multiple spaces
          .trim();
        
        const expectedWords = expectedCleaned.split(' ');
        
        cy.window().then((win) => {
          const actualRaw = win.game.scene.scenes[1].gameContainer.list[panelIndex].list[listIndex].text;
          
          // Clean actual text too (optional, if needed)
          const actualCleaned = actualRaw
            .replace(/[\r\n]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          
          const matchedWords = expectedWords.filter(word => actualCleaned.includes(word));
          
          // ✅ Log expected & actual
          cy.log(`🌐 [${Key}] Expected: ${expectedCleaned}`);
          cy.log(`🎮 Actual: ${actualCleaned}`);
          cy.log(`✅ Matched ${matchedWords.length} of ${expectedWords.length} words`);
          
          console.log(`[${Key}] Expected:`, expectedCleaned);
          console.log(`Actual:`, actualCleaned);
          console.log(`Matched Words:`, matchedWords);

          if (matchedWords.length < 2) { // Your threshold
            console.log(`All translations for ${Key}:`, Translation);
            cy.log(`All translations for ${Key}:`, Translation);
          }
          
          expect(matchedWords.length).to.be.gte(1); // or adjust based on your threshold
        });
      };

      // Verify object translation (panelIndex 1)
      verify('STAKE', 15, 1);
      verify('BALANCE', 15, 3);
    });



    cy.fixture('translations.json').then((translations) => {
      // Function to verify translation
      const verify = (Key, panelIndex, listIndex) => {
        const TranslationButton = translations.find(item => 
          item["Section key"] === "BUTTONS" && 
          item.Key === Key
        );

        if (!TranslationButton) {
          throw new Error(`Translation not found for ${Key} in ${lang}`);
        }

        const expectedButtonRaw = TranslationButton[lang];
        
        // Clean up expected translation
          const expectedButtonCleaned = expectedButtonRaw
          .replace(/[\r\n]+/g, ' ') // replace newlines with space
          .replace(/\s+/g, ' ')     // collapse multiple spaces
          .trim();
        

        const expectedButtonWords = expectedButtonCleaned.split(' ');
        
        cy.window().then((win) => {
          const actualButtonRaw = win.game.scene.scenes[1].gameContainer.list[panelIndex].list[listIndex].list[1].text;
          
          // Clean actual text too (optional, if needed)
            const actualButtonCleaned = actualButtonRaw
            .replace(/[\r\n]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim() 

          const matchedButtonWords = expectedButtonWords.filter(word => actualButtonCleaned.includes(word));
          
          // ✅ Log expected & actual

          cy.log(`🌐 [${Key}] Expected: ${expectedButtonCleaned}`);
          cy.log(`🎮 Actual: ${actualButtonCleaned}`);
          cy.log(`✅ Matched ${matchedButtonWords.length} of ${expectedButtonWords.length} words`);
          

          console.log(`[${Key}] Expected:`, expectedButtonCleaned);
          console.log(`Actual:`, actualButtonCleaned);
          console.log(`Matched Words:`, matchedButtonWords);


          if (matchedButtonWords.length < 2) { // Your threshold
            console.log(`All translations for ${Key}:`, TranslationButton);
            cy.log(`All translations for ${Key}:`, TranslationButton);
          }
          
          expect(matchedButtonWords.length).to.be.gte(1); // or adjust based on your threshold
        });
      };

      // Verify object translation (panelIndex 1)
 
      verify('LEAGUES', 7, 3);
    });
  });
});


describe('Top panel translations', () => {
  it('should verify top panel translations', () => {

    cy.fixture('translations.json').then((translations) => {
      // Function to verify translation
      const verify = (Key, panelIndex, listIndex) => {
        const Translation = translations.find(item => 
          item["Section key"] === "MIDDLE" && 
          item.Key === Key
        );

        if (!Translation) {
          throw new Error(`Translation not found for ${Key} in ${lang}`);
        }

        const expectedRaw = Translation[lang];
        
        // Clean up expected translation
        const expectedCleaned = expectedRaw
          .replace(/[\r\n]+/g, ' ') // replace newlines with space
          .replace(/\s+/g, ' ')     // collapse multiple spaces
          .trim();

        const expectedWords = expectedCleaned.split(' ');
        
        cy.window().then((win) => {
          const actualRaw = win.game.scene.scenes[1].gameContainer.list[panelIndex].list[listIndex].text;
          
          // Clean actual text too (optional, if needed)
          const actualCleaned = actualRaw
            .replace(/[\r\n]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
           
          const matchedWords = expectedWords.filter(word => actualCleaned.includes(word));

          // ✅ Log expected & actual
          cy.log(`🌐 [${Key}] Expected: ${expectedCleaned}`);
          cy.log(`🎮 Actual: ${actualCleaned}`);
          cy.log(`✅ Matched ${matchedWords.length} of ${expectedWords.length} words`);
          
          console.log(`[${Key}] Expected:`, expectedCleaned);
          console.log(`Actual:`, actualCleaned);
          console.log(`Matched Words:`, matchedWords);

          if (matchedWords.length < 2) { // Your threshold
            console.log(`All translations for ${Key}:`, Translation);
            cy.log(`All translations for ${Key}:`, Translation);
          }
          
          expect(matchedWords.length).to.be.gte(1); // or adjust based on your threshold
        });
      };
      // Verify object translation (panelIndex 1)
      verify('GOALS', 4, 6);
      verify('GOALS', 4, 7);
      verify('GOALS', 4, 8);
      verify('GOALS', 4, 9);
      verify('GOALS', 4, 10);
      // verify('ENGLAND_LEAGUE', 4, 10);
    });
  });
});


describe('Help page: total goals translations', () => {
  it('should verify help page translations', () => {

    cy.fixture('translations.json').then((translations) => {
      // Function to verify progress bar translation
      const verify = (progressKey, panelIndex, listIndex) => {
        const progressTranslation = translations.find(item => 
          item["Section key"] === "HELP" && 
          item.Key === progressKey
        );

        if (!progressTranslation) {
          throw new Error(`Translation not found for ${progressKey} in ${lang}`);
        }

        const expectedRaw = progressTranslation[lang];
        
        // Clean up expected translation
        const expectedCleaned = expectedRaw
          .replace(/[\r\n]+/g, ' ') // replace newlines with space
          .replace(/\s+/g, ' ')     // collapse multiple spaces
          .trim();
        
        const expectedWords = expectedCleaned.split(' ');
        
        cy.window().then((win) => {
          const actualRaw = win.game.scene.scenes[1].gameContainer.list[panelIndex].stackTable.list[listIndex].list[1].text;
          
          // Clean actual text too (optional, if needed)
          const actualCleaned = actualRaw
            .replace(/[\r\n]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          
          const matchedWords = expectedWords.filter(word => actualCleaned.includes(word));
          
          // ✅ Log expected & actual
          cy.log(`🌐 [${progressKey}] Expected: ${expectedCleaned}`);
          cy.log(`🎮 Actual: ${actualCleaned}`);
          cy.log(`✅ Matched ${matchedWords.length} of ${expectedWords.length} words`);
          
          console.log(`[${progressKey}] Expected:`, expectedCleaned);
          console.log(`Actual:`, actualCleaned);
          console.log(`Matched Words:`, matchedWords);

          if (matchedWords.length < 2) { // Your threshold
            console.log(`All translations for ${progressKey}:`, progressTranslation);
            cy.log(`All translations for ${progressKey}:`, progressTranslation);
          }
          
          expect(matchedWords.length).to.be.gte(1); // or adjust based on your threshold
        });
      };

      // Verify object translation (panelIndex 1)
      verify('TOTAL_GOALS', 13, 0);
      verify('PRIZE', 13, 1);
      verify('GOALS', 13, 2);
      verify('GOALS', 13, 4);
      verify('GOALS', 13, 6);
      verify('GOALS', 13, 8);
      verify('GOALS', 13, 10);
      verify('INSTANT_WIN_BONUS_LOW', 13, 12);
      verify('VARIABLE', 13, 13);
      verify('LOSE_OR_DRAW', 13, 14);
    });
  });
});


describe('Help page: total goals translations', () => {
  it('should verify help page translations', () => {

    cy.fixture('translations.json').then((translations) => {
      // Function to verify progress bar translation
      const verify = (progressKey, panelIndex, listIndex) => {
        const progressTranslation = translations.find(item => 
          item["Section key"] === "HELP" && 
          item.Key === progressKey
        );

        if (!progressTranslation) {
          throw new Error(`Translation not found for ${progressKey} in ${lang}`);
        }

        const expectedRaw = progressTranslation[lang];
        
        // Clean up expected translation
        const expectedCleaned = expectedRaw
          .replace(/[\r\n]+/g, ' ') // replace newlines with space
          .replace(/\s+/g, ' ')     // collapse multiple spaces
          .trim();
        
        const expectedWords = expectedCleaned.split(' ');
        
        cy.window().then((win) => {
          const actualRaw = win.game.scene.scenes[1].gameContainer.list[panelIndex].bonusTable.list[listIndex].list[1].text;
          
          // Clean actual text too (optional, if needed)
          const actualCleaned = actualRaw
            .replace(/[\r\n]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          
          const matchedWords = expectedWords.filter(word => actualCleaned.includes(word));
          
          // ✅ Log expected & actual
          cy.log(`🌐 [${progressKey}] Expected: ${expectedCleaned}`);
          cy.log(`🎮 Actual: ${actualCleaned}`);
          cy.log(`✅ Matched ${matchedWords.length} of ${expectedWords.length} words`);
          
          console.log(`[${progressKey}] Expected:`, expectedCleaned);
          console.log(`Actual:`, actualCleaned);
          console.log(`Matched Words:`, matchedWords);

          if (matchedWords.length < 2) { // Your threshold
            console.log(`All translations for ${progressKey}:`, progressTranslation);
            cy.log(`All translations for ${progressKey}:`, progressTranslation);
          }
          
          expect(matchedWords.length).to.be.gte(1); // or adjust based on your threshold
        });
      };

      // Verify object translation (panelIndex 1)
      verify('INSTANT_WIN_BONUS', 13, 0);
      verify('PRIZE', 13, 1);
    });
  });
});


describe('Help page translations', () => {
  it('should verify help page translations', () => {

    cy.window().then((win) => {
      const game = win.game;
      game.scene.scenes[1].gameContainer.list[7].list[0].emit('pointerdown');
    });

    cy.fixture('translations.json').then((translations) => {
      // Function to verify progress bar translation
      const verify = (progressKey, panelIndex, listIndex) => {
        const progressTranslation = translations.find(item => 
          item["Section key"] === "HELP" && 
          item.Key === progressKey
        );

        if (!progressTranslation) {
          throw new Error(`Translation not found for ${progressKey} in ${lang}`);
        }

        const expectedRaw = progressTranslation[lang];
        
        // Clean up expected translation
        const expectedCleaned = expectedRaw
          .replace(/[\r\n]+/g, ' ') // replace newlines with space
          .replace(/\s+/g, ' ')     // collapse multiple spaces
          .trim();
        
        const expectedWords = expectedCleaned.split(' ');
        
        cy.window().then((win) => {
          const actualRaw = win.game.scene.scenes[1].gameContainer.list[panelIndex].list[listIndex].text;
          
          // Clean actual text too (optional, if needed)
          const actualCleaned = actualRaw
            .replace(/[\r\n]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          
          const matchedWords = expectedWords.filter(word => actualCleaned.includes(word));
          
          // ✅ Log expected & actual
          cy.log(`🌐 [${progressKey}] Expected: ${expectedCleaned}`);
          cy.log(`🎮 Actual: ${actualCleaned}`);
          cy.log(`✅ Matched ${matchedWords.length} of ${expectedWords.length} words`);
          
          console.log(`[${progressKey}] Expected:`, expectedCleaned);
          console.log(`Actual:`, actualCleaned);
          console.log(`Matched Words:`, matchedWords);

          if (matchedWords.length < 2) { // Your threshold
            console.log(`All translations for ${progressKey}:`, progressTranslation);
            cy.log(`All translations for ${progressKey}:`, progressTranslation);
          }
          
          // Determine threshold based on key type
          const isTitle = progressKey.includes('TITLE');
          const minThreshold = isTitle ? 1 : 6; // 1 for titles, 6 for descriptions
          
          expect(matchedWords.length).to.be.gte(minThreshold);
        });
      };

      // Verify object translation (panelIndex 1)
      verify('HELP_PAGE_TITLE_ENG', 13, 0);
      cy.wait(500)
      verify('PAY_TABLE_TITLE', 13, 11);
      verify('PAY_TABLE_DESCRIPTION_TXT1', 13, 12);

      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      cy.wait(500)
      verify('HOW_TO_PLAY_TITLE', 13, 11);
      verify('HOW_TO_PLAY_DESCRIPTION_TXT1', 13, 12);

      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      cy.wait(500)
      verify('HOW_TO_PLAY_TITLE', 13, 11);
      verify('HOW_TO_PLAY_DESCRIPTION_TXT2_ENG', 13, 12);

      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      cy.wait(500)
      verify('HIGHLIGHTS_TITLE', 13, 11);
      verify('HIGHLIGHTS_DESCRIPTION_TXT1_ENG', 13, 12);

      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      cy.wait(500)
      verify('WINNINGS_TITLE', 13, 11);
      verify('WINNINGS_DESCRIPTION_TXT1', 13, 12);

      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      cy.wait(500)
      verify('BALL_SELECT_TITLE', 13, 11);
      verify('BALL_SELECT_DESCRIPTION_TXT1', 13, 12);

      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      cy.wait(500)
      verify('GENERAL_TITLE', 13, 11);
      verify('GENERAL_DESCRIPTION_TXT1', 13, 12);
    });
  });
});