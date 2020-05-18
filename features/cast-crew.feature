Feature: Can I as a contributor add Cast&Crew information to Suits
  As a contributor I want to be able to add data to the Cast&Crew section
  of Suits.

  Scenario Outline: Add data to Suits Cast&Crew section
    Given that I am on the Suits page
    And that I have clicked the Edit button
    And that I haved chosen to add a credit in the Cast&Crew section and clicked on the continue button
    When I add data in "<Input1>","<Input2>", "<Input3>" and click button check these updates
    And I click the button Submit these updates
    Then the data I have submitted should be sent


    Examples:
      | Input1        | Input2                              | Input3         |
      | Gabriel Macht | Episode Errors and Omissions (#1.2) | Harvey Specter |

