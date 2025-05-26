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
    });


    cy.fixture('translations.json').then((translations) => {
      // Function to verify a league button translation
      const verify = (leagueKey, panelIndex, listIndex) => {
        const leagueTranslation = translations.find(item => 
          item["Section key"] === "LOADING" && 
          item.Key === leagueKey
        );

        if (!leagueTranslation) {
          throw new Error(`Translation not found for ${leagueKey} in ${languageCode}`);
        }

        const expectedRaw = leagueTranslation[languageCode];
        
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
          
          expect(matchedWords.length).to.be.gte(2); // or adjust based on your threshold
        });
      };

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
          throw new Error(`Translation not found for ${progressKey} in ${languageCode}`);
        }

        const expectedRaw = progressTranslation[languageCode];
        
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
          throw new Error(`Translation not found for ${Key} in ${languageCode}`);
        }

        const expectedRaw = Translation[languageCode];
        
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
          throw new Error(`Translation not found for ${Key} in ${languageCode}`);
        }

        const expectedRaw = Translation[languageCode];
        
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
          throw new Error(`Translation not found for ${Key} in ${languageCode}`);
        }

        const expectedButtonRaw = TranslationButton[languageCode];
        
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
          throw new Error(`Translation not found for ${Key} in ${languageCode}`);
        }

        const expectedRaw = Translation[languageCode];
        
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
    });


    cy.fixture('translations.json').then((translations) => {
      // Function to verify translation
      const verify = (Key, panelIndex) => {
        const Translation = translations.find(item => 
          item["Section key"] === "LOADING" && 
          item.Key === Key
        );

        if (!Translation) {
          throw new Error(`Translation not found for ${Key} in ${languageCode}`);
        }

        const expectedRaw = Translation[languageCode];
        
        // Clean up expected translation
        const expectedCleaned = expectedRaw
          .replace(/[\r\n]+/g, ' ') // replace newlines with space
          .replace(/\s+/g, ' ')     // collapse multiple spaces
          .trim();

        const expectedWords = expectedCleaned.split(' ');
        
        cy.window().then((win) => {
          const actualRaw = win.game.scene.scenes[1].gameContainer.logo.list[panelIndex].text;
          
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
      verify('ENGLAND_LEAGUE', 3);
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
          throw new Error(`Translation not found for ${progressKey} in ${languageCode}`);
        }

        const expectedRaw = progressTranslation[languageCode];
        
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
          throw new Error(`Translation not found for ${progressKey} in ${languageCode}`);
        }

        const expectedRaw = progressTranslation[languageCode];
        
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
          throw new Error(`Translation not found for ${progressKey} in ${languageCode}`);
        }

        const expectedRaw = progressTranslation[languageCode];
        
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

      // Function to verify text in helpPageContainer
      const verifyHelpPageContainer = (sectionKey, progressKey, panelIndex, listIndex, nestedListIndex = null) => {
        const progressTranslation = translations.find(item => 
            item["Section key"] === sectionKey && 
            item.Key === progressKey
        );
    
        if (!progressTranslation) {
            throw new Error(`Translation not found for ${progressKey} in ${languageCode}`);
        }
    
        const expectedRaw = progressTranslation[languageCode];
        
        const expectedCleaned = expectedRaw
            .replace(/[\r\n]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        
        const expectedWords = expectedCleaned.split(' ');
        
        cy.window().then((win) => {
            // Get the base element
            const baseElement = win.game.scene.scenes[1].gameContainer.list[13].helpPageContainer[panelIndex].list[listIndex];
            
            // Handle nested list if specified
            const actualRaw = nestedListIndex !== null 
                ? baseElement.list[nestedListIndex].text 
                : baseElement.text;
            
            const actualCleaned = actualRaw
                .replace(/[\r\n]+/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
            
            const matchedWords = expectedWords.filter(word => actualCleaned.includes(word));
            
            cy.log(`🌐 [${progressKey}] Expected: ${expectedCleaned}`);
            cy.log(`🎮 Actual: ${actualCleaned}`);
            cy.log(`✅ Matched ${matchedWords.length} of ${expectedWords.length} words`);
            
            console.log(`[${progressKey}] Expected:`, expectedCleaned);
            console.log(`Actual:`, actualCleaned);
            console.log(`Matched Words:`, matchedWords);
    
            if (matchedWords.length < 2) {
                console.log(`All translations for ${progressKey}:`, progressTranslation);
                cy.log(`All translations for ${progressKey}:`, progressTranslation);
            }
            
            expect(matchedWords.length).to.be.gte(2);
        });
    };

      // Verify object translation (panelIndex 1)
      verify('HELP_PAGE_TITLE_ENG', 13, 0);
     
      function waitForTranslation(sectionKey, translationKey, panelIndex, listIndex) {
        cy.window().should((win) => {
          const game = win.game;
          const main_scene = game?.scene?.scenes?.[1];
          const text = main_scene?.gameContainer?.list?.[panelIndex]?.list?.[listIndex]?.text;
          
          const translationObj = translations.find(item => 
            item["Section key"] === sectionKey && 
            item.Key === translationKey
          );
          
          if (!translationObj) {
            throw new Error(`${translationKey} translations not found`);
          }
          
          const translationValues = Object.entries(translationObj)
            .filter(([key]) => !['Section key', 'Key'].includes(key))
            .map(([_, value]) => value);
          
          expect(
            translationValues.some(translation => text.includes(translation))
          ).to.be.true;
        });
      }
      
      // Then use it like this:
      waitForTranslation('HELP', 'PAY_TABLE_TITLE', 13, 11);

      verify('PAY_TABLE_TITLE', 13, 11);
      verify('PAY_TABLE_DESCRIPTION_TXT1', 13, 12);
     

      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      cy.wait(600)

      waitForTranslation('HELP', 'HOW_TO_PLAY_TITLE', 13, 11);
      
      verify('HOW_TO_PLAY_TITLE', 13, 11);
      verify('HOW_TO_PLAY_DESCRIPTION_TXT1', 13, 12);



      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      cy.wait(600)

      waitForTranslation('HELP', 'HOW_TO_PLAY_TITLE', 13, 11);
      verify('HOW_TO_PLAY_TITLE', 13, 11);
      verify('HOW_TO_PLAY_DESCRIPTION_TXT2_ENG', 13, 12);

      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      
      cy.wait(600)
      // cy.screenshot('gg_translation.cy.js/help_4')
      waitForTranslation('HELP', 'HIGHLIGHTS_TITLE', 13, 11);
      verify('HIGHLIGHTS_TITLE', 13, 11);
      verify('HIGHLIGHTS_DESCRIPTION_TXT1_ENG', 13, 12);
      // Verify the WIN_UP_TO text in helpPageContainer
      verifyHelpPageContainer('MIDDLE','WIN_UP_TO', 2, 1);

      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      
      cy.wait(600)
      // cy.screenshot('gg_translation.cy.js/help_5')
      waitForTranslation('HELP', 'WINNINGS_TITLE', 13, 11);
      verify('WINNINGS_TITLE', 13, 11);
      verify('WINNINGS_DESCRIPTION_TXT1', 13, 12);
      verifyHelpPageContainer('BONUS','INSTANT_WIN', 4, 2);

      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });

      

      cy.wait(600)
      // waitForTranslation('HELP', 'BALL_SELECT_TITLE', 13, 11);
      waitForTranslation('HELP', 'BALL_SELECT_TITLE', 13, 11);
      verify('BALL_SELECT_TITLE', 13, 11);
      verify('BALL_SELECT_DESCRIPTION_TXT1', 13, 12);
      verifyHelpPageContainer('WIN_LOSE_BANNER','NO_WIN', 5, 1);
      verifyHelpPageContainer('WIN_LOSE_BANNER','MAIN_MENU', 5, 2, 2);
      verifyHelpPageContainer('WIN_LOSE_BANNER','BET_LESS', 5, 3, 2);
      verifyHelpPageContainer('WIN_LOSE_BANNER','BET_AGAIN', 5, 4, 2);
      verifyHelpPageContainer('WIN_LOSE_BANNER','BET_MORE', 5, 5, 2);


      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      cy.wait(500)
      waitForTranslation('HELP', 'GENERAL_TITLE', 13, 11);
      verify('GENERAL_TITLE', 13, 11);
      verify('GENERAL_DESCRIPTION_TXT1', 13, 12);
    });
  });
});


describe('History page translations', () => {
  it('should verify history page translations', () => {
  
    cy.window().then((win) => {
      const game = win.game;
      game.scene?.scenes[1].gameContainer?.list?.[13]?.closeHelpPageButton?.emit('pointerdown')
    });

    cy.window().should((win) => {
      const game = win.game;
      const main_scene = game?.scene?.scenes?.[1];
      const historyButton = main_scene?.gameContainer.list?.[7]?.historyButton.visible;
    
      expect(historyButton).to.be.true;

    });

    cy.window().then((win) => {
      win.game.scene.scenes[1].gameContainer.list[7].list[1].emit('pointerdown')
    });

    cy.fixture('translations.json').then((translations) => {
      // Function to verify progress bar translation
      const verify = (progressKey, panelIndex, listIndex) => {
        const progressTranslation = translations.find(item => 
          item["Section key"] === "HISTORY" && 
          item.Key === progressKey
        );

        if (!progressTranslation) {
          throw new Error(`Translation not found for ${progressKey} in ${languageCode}`);
        }

        const expectedRaw = progressTranslation[languageCode];
        
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
          const isStake = progressKey.includes('STAKE');
          const isGoalOrMiss = progressKey === 'GOAL' || progressKey === 'MISS';
          const minThreshold = isStake || isGoalOrMiss ? 1 : 2; // 1 for stake/goal/miss, 2 for everything else
          
          expect(matchedWords.length).to.be.gte(minThreshold);
        });
      };


      // Verify object translation (panelIndex 1)
      verify('HISTORY_PAGE_TITLE', 9, 0);


      cy.window().should((win) => {
        const game = win.game;
        const main_scene = game?.scene?.scenes?.[1];
        const history = main_scene?.gameContainer.list?.[9]?.list?.[15].text;
        
        expect(history).to.exist;
        expect(history).to.be.a('string');
        expect(history.trim()).to.not.be.empty;
      });

      verify('ROUND_START_TIME', 9, 15);
      verify('HISTORY_STAKE', 9, 16);
      verify('SCRATCH_LIST', 9, 17);
      verify('GOAL', 9, 17);
      verify('MISS', 9, 17);
      verify('GOALS_SCORED', 9, 18);
      verify('TOTAL_WIN', 9, 19);
    });
  });
});


describe('Middle panel translations', () => {
  it('should verify middle panel translations', () => {
  
    cy.window().then((win) => {
      const game = win.game;
      game.scene?.scenes[1].gameContainer?.list?.[9]?.closeHistoryPageButton?.emit('pointerdown')
    });


    cy.window().then((win) => {
      const game = win.game;
      game.scene.scenes[1].gameContainer.list[3].list[0].list[0].emit('pointerdown')
    });

    cy.window().should((win) => {
      const game = win.game;
      const main_scene = game?.scene?.scenes?.[1];
      const revealButton = main_scene?.gameContainer.list?.[2]?.list?.[9].visible;
    
      expect(revealButton).to.be.true;
    });

    cy.fixture('translations.json').then((translations) => {
      // Unified verification function that handles both cases
      const verify = (key, sectionKey, panelIndex, listIndex, listIndex_2 = null) => {
        const translation = translations.find(item => 
          item["Section key"] === sectionKey && 
          item.Key === key
        );

        if (!translation) {
          throw new Error(`Translation not found for ${key}`);
        }

        const expectedRaw = translation[languageCode];
        const expectedCleaned = expectedRaw
          .replace(/[\r\n]+/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        
        const expectedWords = expectedCleaned.split(' ');

        cy.window().then((win) => {
          let actualRaw;
          const target = win.game.scene.scenes[1].gameContainer.list[panelIndex];
          
          // Handle both paths (with or without listIndex_2)
          if (listIndex_2 !== null) {
            actualRaw = target.list[listIndex].list[listIndex_2].text;
          } else {
            actualRaw = target.list[listIndex].text;
          }

          const actualCleaned = actualRaw
            .replace(/[\r\n]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          
          const matchedWords = expectedWords.filter(word => actualCleaned.includes(word));
          
          cy.log(`🌐 [${key}] Expected: ${expectedCleaned}`);
          cy.log(`🎮 Actual: ${actualCleaned}`);
          cy.log(`✅ Matched ${matchedWords.length} of ${expectedWords.length} words`);
          
          if (matchedWords.length < 2) {
            cy.log(`All translations for ${key}:`, translation);
          }
          
          expect(matchedWords.length).to.be.gte(1);
        });
      };

      // Verify object translation (panelIndex 1)
      verify('REVEAL_ALL', 'BUTTONS', 2, 8, 1);
      verify('WIN_UP_TO', 'MIDDLE', 2, 1);
      verify('WIN_UP_TO_DESCRIPTION_TXT1', 'MIDDLE', 2, 9);
    });
  });
});


describe('Banner translations', () => {
  it('should verify banner translations', () => {
    
    cy.window().then((win) => {
      win.game.scene.scenes[1].gameContainer.list[2].list[8].list[0].emit('pointerdown')
    })

    cy.window().should((win) => {
      const game = win.game;
      const main_scene = game?.scene?.scenes?.[1];
      const skipButton = main_scene?.gameContainer.list[15].visible;
    
      expect(skipButton).to.be.true;
    })

    // skip
    cy.window().then((win) => {
      win.game.scene.scenes[1].gameContainer.list[15].list[0].list[0].emit('pointerdown')
    });

    cy.wait(2500)
    cy.window().should((win) => {
      const game = win.game;
      const main_scene = game?.scene?.scenes?.[1];
      const no_Button = main_scene?.gameContainer.noWinBanner.visible;
      const win_button = game.scene.scenes[1].gameContainer.winBanner.visible;
    
      expect(no_Button || win_button).to.be.true;
    });

    cy.fixture('translations.json').then((translations) => {
      // Unified verification function that handles both cases
      const verify = (key, sectionKey, panelIndex, listIndex, listIndex_2 = null) => {
        const translation = translations.find(item => 
          item["Section key"] === sectionKey && 
          item.Key === key
        );

        if (!translation) {
          throw new Error(`Translation not found for ${key}`);
        }

        const expectedRaw = translation[languageCode];
        const expectedCleaned = expectedRaw
          .replace(/[\r\n]+/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        
        const expectedWords = expectedCleaned.split(' ');

        cy.window().then((win) => {
          let actualRaw;
          const target = win.game.scene.scenes[1].gameContainer.list[panelIndex];
          
          // Handle both paths (with or without listIndex_2)
          if (listIndex_2 !== null) {
            actualRaw = target.list[listIndex].list[listIndex_2].text;
          } else {
            actualRaw = target.list[listIndex].text;
          }

          const actualCleaned = actualRaw
            .replace(/[\r\n]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          
          const matchedWords = expectedWords.filter(word => actualCleaned.includes(word));
          
          cy.log(`🌐 [${key}] Expected: ${expectedCleaned}`);
          cy.log(`🎮 Actual: ${actualCleaned}`);
          cy.log(`✅ Matched ${matchedWords.length} of ${expectedWords.length} words`);
          
          if (matchedWords.length < 2) {
            cy.log(`All translations for ${key}:`, translation);
          }
          
          expect(matchedWords.length).to.be.gte(1);
        });
      };

      // Verify first set of translations (with listIndex_2)
      verify('MAIN_MENU', 'WIN_LOSE_BANNER', 13, 3, 2);
      verify('BET_LESS', 'WIN_LOSE_BANNER', 13, 4, 2);
      verify('BET_AGAIN', 'WIN_LOSE_BANNER', 13, 5, 2);
      verify('BET_MORE', 'WIN_LOSE_BANNER', 13, 6, 2);

      // Verify second set of translations (without listIndex_2)
      cy.window().then((win) => {
        const game = win.game;
        const no_win_banner = game.scene.scenes[1].gameContainer.noWinBanner;
    
        if (no_win_banner && no_win_banner.visible == true) {
          verify('NO_WIN', 'WIN_LOSE_BANNER', 13, 2);
        } else {
          verify('YOU_HAVE_WON', 'BANNERS', 10, 2);
          verify('CONGRATULATIONS', 'BONUS', 10, 1);
        }
      });
    });
  });
});


  describe('Change league', () => {
  it('should change league', () => {

    cy.window().then((win) => {
      const game = win.game;
  
      // Check if "no win" banner is visible
      const no_win_banner = game.scene.scenes[1].gameContainer.noWinBanner
  
      if (no_win_banner && no_win_banner.visible == true) {
        // Run alternate block for "no win"
        const nowin_banner = game.scene.scenes[1].gameContainer.list[13].list[3].list[0];
        nowin_banner.emit('pointerdown');
      } else {
        const again_button = game.scene.scenes[1].gameContainer.list[10].list[4].list[0];
        again_button.emit('pointerdown');
      }

    });
    cy.wait(2000)
    cy.window().should((win) => {
      const game = win.game;
      const scene = game?.scene?.scenes?.[1];
      expect(scene?.gameContainer?.list?.[6]?.backToLeagueMenuButton).to.exist;  
    });

    cy.window().then((win) => {
      const game = win.game;
      const scene = game.scene.scenes[1];

      scene.gameContainer?.list?.[6]?.backToLeagueMenuButton.list[0].emit('pointerdown');
    });

    cy.window().should((win) => {
      const game = win.game;
      const scene = game?.scene?.scenes?.[2];
      expect(scene?.loadingPanel.list[2].list[0]).to.exist;  
    });

    cy.wait(1000)

    cy.window().then((win) => {
      const game = win.game;
      const scene = game.scene.scenes[2];

      scene.loadingPanel.list[2].list[0].emit('pointerdown');
      // Click Start (assuming it's in list[6].list[0])
      scene.loadingPanel.list[6].list[0].emit('pointerdown');
    });
  
    cy.window().should((win) => {
      const game = win.game;
      expect(game.scene.scenes[1].gameContainer.list[7].list[0].visible).to.be.true
    });

    cy.window().then((win) => {
      const game = win.game;
      game.scene.scenes[1].gameContainer.list[7].list[0].emit('pointerdown');

    });
  });
});


describe('Check Help page [IT] translation', () => {
  it('should change league', () => {

    cy.window().should((win) => {
      const game = win.game;
      expect(game.scene.scenes[1].gameContainer.list[7].infoButton.visible).to.be.true
    });

    cy.window().then((win) => {
      const game = win.game;
      game.scene.scenes[1].gameContainer.list[7].infoButton.emit('pointerdown');



    cy.fixture('translations.json').then((translations) => {
      // Function to verify progress bar translation
      const verify = (progressKey, panelIndex, listIndex) => {
        const progressTranslation = translations.find(item => 
          item["Section key"] === "HELP" && 
          item.Key === progressKey
        );

        if (!progressTranslation) {
          throw new Error(`Translation not found for ${progressKey} in ${languageCode}`);
        }

        const expectedRaw = progressTranslation[languageCode];
        
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

      // Function to verify text in helpPageContainer
      const verifyHelpPageContainer = (sectionKey, progressKey, panelIndex, listIndex, nestedListIndex = null) => {
        const progressTranslation = translations.find(item => 
            item["Section key"] === sectionKey && 
            item.Key === progressKey
        );
    
        if (!progressTranslation) {
            throw new Error(`Translation not found for ${progressKey} in ${languageCode}`);
        }
    
        const expectedRaw = progressTranslation[languageCode];
        
        const expectedCleaned = expectedRaw
            .replace(/[\r\n]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        
        const expectedWords = expectedCleaned.split(' ');
        
        cy.window().then((win) => {
            // Get the base element
            const baseElement = win.game.scene.scenes[1].gameContainer.list[13].helpPageContainer[panelIndex].list[listIndex];
            
            // Handle nested list if specified
            const actualRaw = nestedListIndex !== null 
                ? baseElement.list[nestedListIndex].text 
                : baseElement.text;
            
            const actualCleaned = actualRaw
                .replace(/[\r\n]+/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
            
            const matchedWords = expectedWords.filter(word => actualCleaned.includes(word));
            
            cy.log(`🌐 [${progressKey}] Expected: ${expectedCleaned}`);
            cy.log(`🎮 Actual: ${actualCleaned}`);
            cy.log(`✅ Matched ${matchedWords.length} of ${expectedWords.length} words`);
            
            console.log(`[${progressKey}] Expected:`, expectedCleaned);
            console.log(`Actual:`, actualCleaned);
            console.log(`Matched Words:`, matchedWords);
    
            if (matchedWords.length < 2) {
                console.log(`All translations for ${progressKey}:`, progressTranslation);
                cy.log(`All translations for ${progressKey}:`, progressTranslation);
            }
            
            expect(matchedWords.length).to.be.gte(2);
        });
    };

      // Verify object translation (panelIndex 1)
      verify('HELP_PAGE_TITLE_IT', 13, 0);
     
      function waitForTranslation(sectionKey, translationKey, panelIndex, listIndex) {
        cy.window().should((win) => {
          const game = win.game;
          const main_scene = game?.scene?.scenes?.[1];
          const text = main_scene?.gameContainer?.list?.[panelIndex]?.list?.[listIndex]?.text;
          
          const translationObj = translations.find(item => 
            item["Section key"] === sectionKey && 
            item.Key === translationKey
          );
          
          if (!translationObj) {
            throw new Error(`${translationKey} translations not found`);
          }
          
          const translationValues = Object.entries(translationObj)
            .filter(([key]) => !['Section key', 'Key'].includes(key))
            .map(([_, value]) => value);
          
          expect(
            translationValues.some(translation => text.includes(translation))
          ).to.be.true;
        });
      }
      
      // Then use it like this:
      waitForTranslation('HELP', 'PAY_TABLE_TITLE', 13, 11);

      verify('PAY_TABLE_TITLE', 13, 11);
      verify('PAY_TABLE_DESCRIPTION_TXT1', 13, 12);
     

      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      cy.wait(600)

      waitForTranslation('HELP', 'HOW_TO_PLAY_TITLE', 13, 11);
      
      verify('HOW_TO_PLAY_TITLE', 13, 11);
      verify('HOW_TO_PLAY_DESCRIPTION_TXT1', 13, 12);



      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      cy.wait(600)

      waitForTranslation('HELP', 'HOW_TO_PLAY_TITLE', 13, 11);
      verify('HOW_TO_PLAY_TITLE', 13, 11);
      verify('HOW_TO_PLAY_DESCRIPTION_TXT2_IT', 13, 12);

      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      
      cy.wait(600)
      // cy.screenshot('gg_translation.cy.js/help_4')
      waitForTranslation('HELP', 'HIGHLIGHTS_TITLE', 13, 11);
      verify('HIGHLIGHTS_TITLE', 13, 11);
      verify('HIGHLIGHTS_DESCRIPTION_TXT1_IT', 13, 12);
      // Verify the WIN_UP_TO text in helpPageContainer
      verifyHelpPageContainer('MIDDLE','WIN_UP_TO', 2, 1);

      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      
      cy.wait(600)
      // cy.screenshot('gg_translation.cy.js/help_5')
      waitForTranslation('HELP', 'WINNINGS_TITLE', 13, 11);
      verify('WINNINGS_TITLE', 13, 11);
      verify('WINNINGS_DESCRIPTION_TXT1', 13, 12);
      verifyHelpPageContainer('BONUS','INSTANT_WIN', 4, 2);

      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });

      

      cy.wait(600)
      // waitForTranslation('HELP', 'BALL_SELECT_TITLE', 13, 11);
      waitForTranslation('HELP', 'BALL_SELECT_TITLE', 13, 11);
      verify('BALL_SELECT_TITLE', 13, 11);
      verify('BALL_SELECT_DESCRIPTION_TXT1', 13, 12);
      verifyHelpPageContainer('WIN_LOSE_BANNER','NO_WIN', 5, 1);
      verifyHelpPageContainer('WIN_LOSE_BANNER','MAIN_MENU', 5, 2, 2);
      verifyHelpPageContainer('WIN_LOSE_BANNER','BET_LESS', 5, 3, 2);
      verifyHelpPageContainer('WIN_LOSE_BANNER','BET_AGAIN', 5, 4, 2);
      verifyHelpPageContainer('WIN_LOSE_BANNER','BET_MORE', 5, 5, 2);


      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      cy.wait(500)
      waitForTranslation('HELP', 'GENERAL_TITLE', 13, 11);
      verify('GENERAL_TITLE', 13, 11);
      verify('GENERAL_DESCRIPTION_TXT1', 13, 12);
    });
  });
});
});






describe('Check Help page [TR] translation', () => {
  it('should change league', () => {

    cy.window().then((win) => {
      const game = win.game;
      game.scene?.scenes[1].gameContainer?.list?.[13]?.closeHelpPageButton?.emit('pointerdown')
    });

    cy.wait(1000)

    cy.window().then((win) => {
      const game = win.game;
      const scene = game.scene.scenes[1];

      scene.gameContainer?.list?.[7]?.backToLeagueMenuButton.list[0].emit('pointerdown');
    });

    cy.window().should((win) => {
      const game = win.game;
      const scene = game?.scene?.scenes?.[2];
      expect(scene?.loadingPanel.list[2].list[0]).to.exist;  
    });

    cy.wait(1000)

    cy.window().then((win) => {
      const game = win.game;
      const scene = game.scene.scenes[2];

      scene.loadingPanel.list[3].list[0].emit('pointerdown');
      // Click Start (assuming it's in list[6].list[0])
      scene.loadingPanel.list[6].list[0].emit('pointerdown');
    });

    cy.window().should((win) => {
      const game = win.game;
      expect(game.scene.scenes[1].gameContainer.list[7].infoButton.visible).to.be.true
    });

    cy.window().then((win) => {
      const game = win.game;
      game.scene.scenes[1].gameContainer.list[7].infoButton.emit('pointerdown');



    cy.fixture('translations.json').then((translations) => {
      // Function to verify progress bar translation
      const verify = (progressKey, panelIndex, listIndex) => {
        const progressTranslation = translations.find(item => 
          item["Section key"] === "HELP" && 
          item.Key === progressKey
        );

        if (!progressTranslation) {
          throw new Error(`Translation not found for ${progressKey} in ${languageCode}`);
        }

        const expectedRaw = progressTranslation[languageCode];
        
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

      // Function to verify text in helpPageContainer
      const verifyHelpPageContainer = (sectionKey, progressKey, panelIndex, listIndex, nestedListIndex = null) => {
        const progressTranslation = translations.find(item => 
            item["Section key"] === sectionKey && 
            item.Key === progressKey
        );
    
        if (!progressTranslation) {
            throw new Error(`Translation not found for ${progressKey} in ${languageCode}`);
        }
    
        const expectedRaw = progressTranslation[languageCode];
        
        const expectedCleaned = expectedRaw
            .replace(/[\r\n]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        
        const expectedWords = expectedCleaned.split(' ');
        
        cy.window().then((win) => {
            // Get the base element
            const baseElement = win.game.scene.scenes[1].gameContainer.list[13].helpPageContainer[panelIndex].list[listIndex];
            
            // Handle nested list if specified
            const actualRaw = nestedListIndex !== null 
                ? baseElement.list[nestedListIndex].text 
                : baseElement.text;
            
            const actualCleaned = actualRaw
                .replace(/[\r\n]+/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
            
            const matchedWords = expectedWords.filter(word => actualCleaned.includes(word));
            
            cy.log(`🌐 [${progressKey}] Expected: ${expectedCleaned}`);
            cy.log(`🎮 Actual: ${actualCleaned}`);
            cy.log(`✅ Matched ${matchedWords.length} of ${expectedWords.length} words`);
            
            console.log(`[${progressKey}] Expected:`, expectedCleaned);
            console.log(`Actual:`, actualCleaned);
            console.log(`Matched Words:`, matchedWords);
    
            if (matchedWords.length < 2) {
                console.log(`All translations for ${progressKey}:`, progressTranslation);
                cy.log(`All translations for ${progressKey}:`, progressTranslation);
            }
            
            expect(matchedWords.length).to.be.gte(2);
        });
    };

      // Verify object translation (panelIndex 1)
      verify('HELP_PAGE_TITLE', 13, 0);
     
      function waitForTranslation(sectionKey, translationKey, panelIndex, listIndex) {
        cy.window().should((win) => {
          const game = win.game;
          const main_scene = game?.scene?.scenes?.[1];
          const text = main_scene?.gameContainer?.list?.[panelIndex]?.list?.[listIndex]?.text;
          
          const translationObj = translations.find(item => 
            item["Section key"] === sectionKey && 
            item.Key === translationKey
          );
          
          if (!translationObj) {
            throw new Error(`${translationKey} translations not found`);
          }
          
          const translationValues = Object.entries(translationObj)
            .filter(([key]) => !['Section key', 'Key'].includes(key))
            .map(([_, value]) => value);
          
          expect(
            translationValues.some(translation => text.includes(translation))
          ).to.be.true;
        });
      }
      
      // Then use it like this:
      waitForTranslation('HELP', 'PAY_TABLE_TITLE', 13, 11);

      verify('PAY_TABLE_TITLE', 13, 11);
      verify('PAY_TABLE_DESCRIPTION_TXT1', 13, 12);
     

      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      cy.wait(600)

      waitForTranslation('HELP', 'HOW_TO_PLAY_TITLE', 13, 11);
      
      verify('HOW_TO_PLAY_TITLE', 13, 11);
      verify('HOW_TO_PLAY_DESCRIPTION_TXT1', 13, 12);



      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      cy.wait(600)

      waitForTranslation('HELP', 'HOW_TO_PLAY_TITLE', 13, 11);
      verify('HOW_TO_PLAY_TITLE', 13, 11);
      verify('HOW_TO_PLAY_DESCRIPTION_TXT2', 13, 12);

      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      
      cy.wait(600)
      // cy.screenshot('gg_translation.cy.js/help_4')
      waitForTranslation('HELP', 'HIGHLIGHTS_TITLE', 13, 11);
      verify('HIGHLIGHTS_TITLE', 13, 11);
      verify('HIGHLIGHTS_DESCRIPTION_TXT1', 13, 12);
      // Verify the WIN_UP_TO text in helpPageContainer
      verifyHelpPageContainer('MIDDLE','WIN_UP_TO', 2, 1);

      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      
      cy.wait(600)
      // cy.screenshot('gg_translation.cy.js/help_5')
      waitForTranslation('HELP', 'WINNINGS_TITLE', 13, 11);
      verify('WINNINGS_TITLE', 13, 11);
      verify('WINNINGS_DESCRIPTION_TXT1', 13, 12);
      verifyHelpPageContainer('BONUS','INSTANT_WIN', 4, 2);

      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });

      

      cy.wait(600)
      // waitForTranslation('HELP', 'BALL_SELECT_TITLE', 13, 11);
      waitForTranslation('HELP', 'BALL_SELECT_TITLE', 13, 11);
      verify('BALL_SELECT_TITLE', 13, 11);
      verify('BALL_SELECT_DESCRIPTION_TXT1', 13, 12);
      verifyHelpPageContainer('WIN_LOSE_BANNER','NO_WIN', 5, 1);
      verifyHelpPageContainer('WIN_LOSE_BANNER','MAIN_MENU', 5, 2, 2);
      verifyHelpPageContainer('WIN_LOSE_BANNER','BET_LESS', 5, 3, 2);
      verifyHelpPageContainer('WIN_LOSE_BANNER','BET_AGAIN', 5, 4, 2);
      verifyHelpPageContainer('WIN_LOSE_BANNER','BET_MORE', 5, 5, 2);


      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      cy.wait(500)
      waitForTranslation('HELP', 'GENERAL_TITLE', 13, 11);
      verify('GENERAL_TITLE', 13, 11);
      verify('GENERAL_DESCRIPTION_TXT1', 13, 12);
    });
  });
});
});


describe('Check Help page [ES] translation', () => {
  it('should change league', () => {

    cy.window().then((win) => {
      const game = win.game;
      game.scene?.scenes[1].gameContainer?.list?.[13]?.closeHelpPageButton?.emit('pointerdown')
    });

    cy.wait(1000)

    cy.window().then((win) => {
      const game = win.game;
      const scene = game.scene.scenes[1];

      scene.gameContainer?.list?.[7]?.backToLeagueMenuButton.list[0].emit('pointerdown');
    });

    cy.window().should((win) => {
      const game = win.game;
      const scene = game?.scene?.scenes?.[2];
      expect(scene?.loadingPanel.list[2].list[0]).to.exist;  
    });

    cy.wait(1000)

    cy.window().then((win) => {
      const game = win.game;
      const scene = game.scene.scenes[2];

      scene.loadingPanel.list[4].list[0].emit('pointerdown');
      // Click Start (assuming it's in list[6].list[0])
      scene.loadingPanel.list[6].list[0].emit('pointerdown');
    });

    cy.window().should((win) => {
      const game = win.game;
      expect(game.scene.scenes[1].gameContainer.list[7].infoButton.visible).to.be.true
    });

    cy.window().then((win) => {
      const game = win.game;
      game.scene.scenes[1].gameContainer.list[7].infoButton.emit('pointerdown');



    cy.fixture('translations.json').then((translations) => {
      // Function to verify progress bar translation
      const verify = (progressKey, panelIndex, listIndex) => {
        const progressTranslation = translations.find(item => 
          item["Section key"] === "HELP" && 
          item.Key === progressKey
        );

        if (!progressTranslation) {
          throw new Error(`Translation not found for ${progressKey} in ${languageCode}`);
        }

        const expectedRaw = progressTranslation[languageCode];
        
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

      // Function to verify text in helpPageContainer
      const verifyHelpPageContainer = (sectionKey, progressKey, panelIndex, listIndex, nestedListIndex = null) => {
        const progressTranslation = translations.find(item => 
            item["Section key"] === sectionKey && 
            item.Key === progressKey
        );
    
        if (!progressTranslation) {
            throw new Error(`Translation not found for ${progressKey} in ${languageCode}`);
        }
    
        const expectedRaw = progressTranslation[languageCode];
        
        const expectedCleaned = expectedRaw
            .replace(/[\r\n]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        
        const expectedWords = expectedCleaned.split(' ');
        
        cy.window().then((win) => {
            // Get the base element
            const baseElement = win.game.scene.scenes[1].gameContainer.list[13].helpPageContainer[panelIndex].list[listIndex];
            
            // Handle nested list if specified
            const actualRaw = nestedListIndex !== null 
                ? baseElement.list[nestedListIndex].text 
                : baseElement.text;
            
            const actualCleaned = actualRaw
                .replace(/[\r\n]+/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
            
            const matchedWords = expectedWords.filter(word => actualCleaned.includes(word));
            
            cy.log(`🌐 [${progressKey}] Expected: ${expectedCleaned}`);
            cy.log(`🎮 Actual: ${actualCleaned}`);
            cy.log(`✅ Matched ${matchedWords.length} of ${expectedWords.length} words`);
            
            console.log(`[${progressKey}] Expected:`, expectedCleaned);
            console.log(`Actual:`, actualCleaned);
            console.log(`Matched Words:`, matchedWords);
    
            if (matchedWords.length < 2) {
                console.log(`All translations for ${progressKey}:`, progressTranslation);
                cy.log(`All translations for ${progressKey}:`, progressTranslation);
            }
            
            expect(matchedWords.length).to.be.gte(2);
        });
    };

      // Verify object translation (panelIndex 1)
      verify('HELP_PAGE_TITLE_ES', 13, 0);
     
      function waitForTranslation(sectionKey, translationKey, panelIndex, listIndex) {
        cy.window().should((win) => {
          const game = win.game;
          const main_scene = game?.scene?.scenes?.[1];
          const text = main_scene?.gameContainer?.list?.[panelIndex]?.list?.[listIndex]?.text;
          
          const translationObj = translations.find(item => 
            item["Section key"] === sectionKey && 
            item.Key === translationKey
          );
          
          if (!translationObj) {
            throw new Error(`${translationKey} translations not found`);
          }
          
          const translationValues = Object.entries(translationObj)
            .filter(([key]) => !['Section key', 'Key'].includes(key))
            .map(([_, value]) => value);
          
          expect(
            translationValues.some(translation => text.includes(translation))
          ).to.be.true;
        });
      }
      
      // Then use it like this:
      waitForTranslation('HELP', 'PAY_TABLE_TITLE', 13, 11);

      verify('PAY_TABLE_TITLE', 13, 11);
      verify('PAY_TABLE_DESCRIPTION_TXT1', 13, 12);
     

      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      cy.wait(600)

      waitForTranslation('HELP', 'HOW_TO_PLAY_TITLE', 13, 11);
      
      verify('HOW_TO_PLAY_TITLE', 13, 11);
      verify('HOW_TO_PLAY_DESCRIPTION_TXT1', 13, 12);



      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      cy.wait(600)

      waitForTranslation('HELP', 'HOW_TO_PLAY_TITLE', 13, 11);
      verify('HOW_TO_PLAY_TITLE', 13, 11);
      verify('HOW_TO_PLAY_DESCRIPTION_TXT2_ES', 13, 12);

      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      
      cy.wait(600)
      // cy.screenshot('gg_translation.cy.js/help_4')
      waitForTranslation('HELP', 'HIGHLIGHTS_TITLE', 13, 11);
      verify('HIGHLIGHTS_TITLE', 13, 11);
      verify('HIGHLIGHTS_DESCRIPTION_TXT1_ES', 13, 12);
      // Verify the WIN_UP_TO text in helpPageContainer
      verifyHelpPageContainer('MIDDLE','WIN_UP_TO', 2, 1);

      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      
      cy.wait(600)
      // cy.screenshot('gg_translation.cy.js/help_5')
      waitForTranslation('HELP', 'WINNINGS_TITLE', 13, 11);
      verify('WINNINGS_TITLE', 13, 11);
      verify('WINNINGS_DESCRIPTION_TXT1', 13, 12);
      verifyHelpPageContainer('BONUS','INSTANT_WIN', 4, 2);

      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });

      

      cy.wait(600)
      // waitForTranslation('HELP', 'BALL_SELECT_TITLE', 13, 11);
      waitForTranslation('HELP', 'BALL_SELECT_TITLE', 13, 11);
      verify('BALL_SELECT_TITLE', 13, 11);
      verify('BALL_SELECT_DESCRIPTION_TXT1', 13, 12);
      verifyHelpPageContainer('WIN_LOSE_BANNER','NO_WIN', 5, 1);
      verifyHelpPageContainer('WIN_LOSE_BANNER','MAIN_MENU', 5, 2, 2);
      verifyHelpPageContainer('WIN_LOSE_BANNER','BET_LESS', 5, 3, 2);
      verifyHelpPageContainer('WIN_LOSE_BANNER','BET_AGAIN', 5, 4, 2);
      verifyHelpPageContainer('WIN_LOSE_BANNER','BET_MORE', 5, 5, 2);


      cy.window().then((win) => {
        const game = win.game;
        game.scene.scenes[1].gameContainer.list[13].list[10].emit('pointerdown');
      });
      cy.wait(500)
      waitForTranslation('HELP', 'GENERAL_TITLE', 13, 11);
      verify('GENERAL_TITLE', 13, 11);
      verify('GENERAL_DESCRIPTION_TXT1', 13, 12);
    });
  });
});
});

