# Gacha Rate Calculator

This is a simple Gacha Rate Calculator that considers a pity system. It was created for PixelHeros, but it should work for any basic Gacha system with a pity mechanic.

## The Math

### General Formula

To calculate the percentage pull rate in a gacha game with a pity system, you need to account for both:

1. The chance of pulling a unit normally.
2. The guaranteed pull due to the pity system.

#### Notation

- **`P_base`**: The base probability of pulling a unit on any single pull. For example, if your chance is 0.8%, then `P_base` is `0.008`.
- **`p`**: The number of pulls required to reach pity.
- **`P_effective`**: The effective pull rate considering the pity system.

#### Step-by-Step Calculation

1. **Calculate the Probability of Not Getting a Unit in One Pull**:

    If the chance of getting a unit in one pull is `P_base`, then the chance of **not** getting the unit is `1 - P_base`. This is because there are only two outcomes: you either get the unit or you don’t.

     ```Probability of no pull = 1 - P_base```

2. **Calculate the Probability of Not Getting a Unit in Multiple Pulls**:

    If you make `k` pulls, the chance of **not** getting the unit in each pull stacks up. You multiply the chance of not getting the unit for each pull:

     ```Probability of no pull in k pulls = (1 - P_base)^k```


3. **Calculate the Probability of Getting a Unit Within `p` Pulls**:

    To find out the chance of getting the unit in `p` pulls, you subtract the chance of not getting it at all from 1:


      ```Probability of pulling the unit in p pulls = 1 - (1 - P_base)^p```


    This takes into account both natural pulls and the guaranteed pity pull.

4. **Calculate the Effective Pull Rate**:

    The effective pull rate per pull, considering the pity system, is the average chance of pulling the unit over `p` pulls:


     ```P_effective = (1 - (1 - P_base)^p) / p```


    This formula tells us the adjusted pull rate per pull, which accounts for the effect of pity.

### Final Formula

To find the effective pull rate:

    Effective Pull Rate = (1 - (1 - P_base)^p) / p


Multiply this result by 100 to convert it to a percentage.
