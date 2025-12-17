import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RecipePreviewItem from '../RecipePreviewItem/RecipePreviewItem';
import { EMPTY_LIST_MESSAGES } from '../../../constants/messages';
import { ROUTES, TABS } from '../../../constants';

const mockData = {
  recipes: [
    {
      id: 'e14c977f-bfff-511a-a0d1-fba99c157626',
      title: 'Fennel Dauphinoise',
      instructions:
        'Heat oven to 180C/160C fan/gas 4. Put potatoes, fennel, and garlic in a medium non-stick pan. Pour in milk and double cream, season well and simmer gently, covered, for 10 mins, stirring halfway through, until potatoes are just tender.\r\nDivide the mixture between 2 small (about 150ml) buttered ramekins and scatter with Parmesan. Bake for 40 mins until the potatoes are golden and tender when pierced with a knife. Snip the reserved fennel fronds over before serving.',
      thumb:
        'https://ftp.goit.study/img/so-yummy/preview/Fennel%20Dauphinoise.jpg',
      time: '50 min',
      ownerId: 'c4ba056e-ae75-50ba-a3eb-95f5a1acace6',
      categoryId: 'e064c76b-1f1b-5d61-aa10-b7060062e3b7',
      areaId: '443a57e2-c787-5b68-b8ba-8f609c2f353e',
      created_at: '2025-12-10T17:33:52.633Z',
      updated_at: '2025-12-10T17:33:52.633Z',
      category: {
        id: 'e064c76b-1f1b-5d61-aa10-b7060062e3b7',
        name: 'Side',
        thumb:
          'https://res.cloudinary.com/dpzujl2dr/image/upload/v1765389435/categories/vvjkmlkqpb2hpg8fz6zj.jpg',
      },
      area: {
        id: '443a57e2-c787-5b68-b8ba-8f609c2f353e',
        name: 'French',
      },
      owner: {
        id: 'c4ba056e-ae75-50ba-a3eb-95f5a1acace6',
        name: 'GoIT',
        avatar: null,
      },
    },
    {
      id: '9be92159-1588-53e7-8c58-687943ad227a',
      title: 'Cevapi Sausages',
      instructions:
        'Place the ground meat in a bowl. Chop the onion very finely and grate the garlic cloves. Add to the bowl. Add the chopped parsley, all sorts of paprika, baking soda, dried breadcrumbs, water, Vegeta, salt, and pepper.\r\nMix well with the hand mixer fitted with the dough hooks. Cover the bowl with cling film/ plastic foil and leave to rest for 1 or 2 hours in the refrigerator.\r\nTake portions of the meat mixture, about 50-55 g/ 1.7-1.9 oz/ ¼ cup portions, and form the cevapi. The rolls should be about as thick as your thumb and about 7-10 cm/ 3-4 inches long. I had 18 sausages. The recipe can be easily doubled.\r\nGrill the cevapcici on the hot grill pan or on the barbecue for about 12-14 minutes, turning them several times in between, or until brown and cooked through. I checked by cutting one in the middle and then grilling the following batches for the same period of time.\r\nServe hot as suggested above. The cevapcici can be reheated in the oven at 180 degrees Celsius/ 350 degrees Fahrenheit for about 10 minutes or until heated through. Check one, if it is not hot enough, give the sausages a few more minutes.',
      thumb:
        'https://ftp.goit.study/img/so-yummy/preview/Cevapi%20Sausages.jpg',
      time: '70 min',
      ownerId: 'c4ba056e-ae75-50ba-a3eb-95f5a1acace6',
      categoryId: '60ad0f05-19ce-5694-8cf7-f9a380502e93',
      areaId: 'c6678083-9d61-526d-9536-d8d64baa621d',
      created_at: '2025-12-10T17:33:52.218Z',
      updated_at: '2025-12-10T17:33:52.218Z',
      category: {
        id: '60ad0f05-19ce-5694-8cf7-f9a380502e93',
        name: 'Beef',
        thumb:
          'https://res.cloudinary.com/dpzujl2dr/image/upload/v1765390154/categories/yu9giba48ihwnijo2ff6.jpg',
      },
      area: {
        id: 'c6678083-9d61-526d-9536-d8d64baa621d',
        name: 'Croatian',
      },
      owner: {
        id: 'c4ba056e-ae75-50ba-a3eb-95f5a1acace6',
        name: 'GoIT',
        avatar: null,
      },
    },
    {
      id: 'efbfaeec-4876-59da-8357-3d8aafa11024',
      title: 'Tunisian Orange Cake',
      instructions:
        'Preheat oven to 190 C / Gas 5. Grease a 23cm round springform tin.\r\nCut off the hard bits from the top and bottom of the orange. Slice the orange and remove all seeds. Puree the orange with its peel in a food processor. Add one third of the sugar and the olive oil and continue to mix until well combined.\r\nSieve together flour and baking powder.\r\nBeat the eggs and the remaining sugar with an electric hand mixer for at least five minutes until very fluffy. Fold in half of the flour mixture, then the orange and the vanilla, then fold in the remaining flour. Mix well but not for too long.\r\nPour cake mixture into prepared tin and smooth out. Bake in preheated oven for 20 minutes. Reduce the oven temperature to 160 C / Gas 2 and bake again for 30 minutes Bake until the cake is golden brown and a skewer comes out clean. Cool on a wire cake rack.',
      thumb:
        'https://ftp.goit.study/img/so-yummy/preview/Tunisian%20Orange%20Cake.jpg',
      time: '50 min',
      ownerId: 'c4ba056e-ae75-50ba-a3eb-95f5a1acace6',
      categoryId: '2f3729dd-6dab-5904-bbc8-5bc4f57c8009',
      areaId: '53428dbe-43fc-54d3-a759-41ba22def7c0',
      created_at: '2025-12-10T17:33:51.941Z',
      updated_at: '2025-12-10T17:33:51.941Z',
      category: {
        id: '2f3729dd-6dab-5904-bbc8-5bc4f57c8009',
        name: 'Dessert',
        thumb:
          'https://res.cloudinary.com/dpzujl2dr/image/upload/v1765389412/categories/kq4rpxgixme8emsojhwy.jpg',
      },
      area: {
        id: '53428dbe-43fc-54d3-a759-41ba22def7c0',
        name: 'Tunisian',
      },
      owner: {
        id: 'c4ba056e-ae75-50ba-a3eb-95f5a1acace6',
        name: 'GoIT',
        avatar: null,
      },
    },
    {
      id: 'c91ceb78-38d3-5936-a3ae-f01d39972e4b',
      title: 'Summer Pistou',
      instructions:
        'Heat the oil in a large pan and fry the leeks and courgette for 5 mins to soften. Pour in the stock, add three-quarters of the haricot beans with the green beans, half the tomatoes, and simmer for 5-8 mins until the vegetables are tender.\r\nMeanwhile, blitz the remaining beans and tomatoes, the garlic and basil in a food processor (or in a bowl with a stick blender) until smooth, then stir in the Parmesan. Stir the sauce into the soup, cook for 1 min, then ladle half into bowls or pour into a flask for a packed lunch. Chill the remainder. Will keep for a couple of days.',
      thumb: 'https://ftp.goit.study/img/so-yummy/preview/Summer%20Pistou.jpg',
      time: '20 min',
      ownerId: 'c4ba056e-ae75-50ba-a3eb-95f5a1acace6',
      categoryId: 'd134c646-0a28-58d8-98d1-3f69870e6279',
      areaId: '443a57e2-c787-5b68-b8ba-8f609c2f353e',
      created_at: '2025-12-10T17:33:51.586Z',
      updated_at: '2025-12-10T17:33:51.586Z',
      category: {
        id: 'd134c646-0a28-58d8-98d1-3f69870e6279',
        name: 'Vegetarian',
        thumb:
          'https://res.cloudinary.com/dpzujl2dr/image/upload/v1765389420/categories/cjz6fs2dazoqnxrypsae.jpg',
      },
      area: {
        id: '443a57e2-c787-5b68-b8ba-8f609c2f353e',
        name: 'French',
      },
      owner: {
        id: 'c4ba056e-ae75-50ba-a3eb-95f5a1acace6',
        name: 'GoIT',
        avatar: null,
      },
    },
    {
      id: '5353656a-a140-56c0-b07e-93d556756257',
      title: 'Provençal Omelette Cake',
      instructions:
        'Break the eggs into two bowls, five in each. Whisk lightly and season with salt and pepper. Heat the oil in a pan, add the courgettes and spring onions, then fry gently for about 10 mins until softened. Cool, then stir into one bowl of eggs with a little salt and pepper. Add the roasted peppers to the other bowl of eggs with the garlic, chilli, salt and pepper.\r\nHeat a little oil in a 20-23cm frying pan, preferably non-stick. Pour the eggs with courgette into a measuring jug, then pourabout one-third of the mixture into the pan, swirling it to cover the base of the pan. Cook until the egg is set and lightly browned underneath, then cover the pan with a plate and invert the omelette onto it. Slide it back into the pan to cook the other side. Repeat with the remaining mix to make two more omelettes, adding a little oil to the pan each time. Stack the omelettes onto a plate. Make three omelettes in the same way with the red pepper mixture, then stack them on a separate plate.\r\nNow make the filling. Beat the cheese to soften it, then beat in the milk to make a spreadable consistency. Stir in the herbs, salt and pepper. Line a deep, 20-23cm round cake tin with cling film (use a tin the same size as the frying pan). Select the best red pepper omelette and place in the tin, prettiest side down. Spread with a thin layer of cheese filling, then cover with a courgette omelette. Repeat, alternating the layers, until all the omelettes and filling are in the tin, finishing with an omelette. Flip the cling film over the omelette, then chill for up to 24 hrs.\r\nTo serve, invert the omelette cake onto a serving plate and peel off the cling film. Pile rocket on the top and scatter over the cheese, a drizzle of olive oil and a little freshly ground black pepper. Serve cut into wedges.',
      thumb:
        'https://ftp.goit.study/img/so-yummy/preview/Provençal%20Omelette%20Cake.jpg',
      time: '60 min',
      ownerId: 'c4ba056e-ae75-50ba-a3eb-95f5a1acace6',
      categoryId: 'd134c646-0a28-58d8-98d1-3f69870e6279',
      areaId: '443a57e2-c787-5b68-b8ba-8f609c2f353e',
      created_at: '2025-12-10T17:33:51.120Z',
      updated_at: '2025-12-10T17:33:51.120Z',
      category: {
        id: 'd134c646-0a28-58d8-98d1-3f69870e6279',
        name: 'Vegetarian',
        thumb:
          'https://res.cloudinary.com/dpzujl2dr/image/upload/v1765389420/categories/cjz6fs2dazoqnxrypsae.jpg',
      },
      area: {
        id: '443a57e2-c787-5b68-b8ba-8f609c2f353e',
        name: 'French',
      },
      owner: {
        id: 'c4ba056e-ae75-50ba-a3eb-95f5a1acace6',
        name: 'GoIT',
        avatar: null,
      },
    },
    {
      id: 'da0dfa31-fa0f-5446-aa0b-3d3b3e54d739',
      title: 'Ful Medames',
      instructions:
        'As the cooking time varies depending on the quality and age of the beans, it is good to cook them in advance and to reheat them when you are ready to serve. Cook the drained beans in a fresh portion of unsalted water in a large saucepan with the lid on until tender, adding water to keep them covered, and salt when the beans have softened. They take 2–2 1/2 hours of gentle simmering. When the beans are soft, let the liquid reduce. It is usual to take out a ladle or two of the beans and to mash them with some of the cooking liquid, then stir this back into the beans. This is to thicken the sauce.\r\nServe the beans in soup bowls sprinkled with chopped parsley and accompanied by Arab bread.\r\nPass round the dressing ingredients for everyone to help themselves: a bottle of extra-virgin olive oil, the quartered lemons, salt and pepper, a little saucer with the crushed garlic, one with chili-pepper flakes, and one with ground cumin.\r\nThe beans are eaten gently crushed with the fork, so that they absorb the dressing.\r\nOptional Garnishes\r\nPeel hard-boiled eggs—1 per person—to cut up in the bowl with the beans.\r\nTop the beans with a chopped cucumber-and-tomato salad and thinly sliced mild onions or scallions. Otherwise, pass round a good bunch of scallions and quartered tomatoes and cucumbers cut into sticks.\r\nServe with tahina cream sauce (page 65) or salad (page 67), with pickles and sliced onions soaked in vinegar for 30 minutes.\r\nAnother way of serving ful medames is smothered in a garlicky tomato sauce (see page 464).\r\nIn Syria and Lebanon, they eat ful medames with yogurt or feta cheese, olives, and small cucumbers.\r\nVariations\r\nA traditional way of thickening the sauce is to throw a handful of red lentils (1/4 cup) into the water at the start of the cooking.\r\nIn Iraq, large brown beans are used instead of the small Egyptian ones, in a dish called badkila, which is also sold for breakfast in the street.',
      thumb: 'https://ftp.goit.study/img/so-yummy/preview/Ful%20Medames.jpg',
      time: '150 min',
      ownerId: 'c4ba056e-ae75-50ba-a3eb-95f5a1acace6',
      categoryId: 'd134c646-0a28-58d8-98d1-3f69870e6279',
      areaId: 'a7b16c16-00e1-5d9a-bdd3-c61f145feb54',
      created_at: '2025-12-10T17:33:50.865Z',
      updated_at: '2025-12-10T17:33:50.865Z',
      category: {
        id: 'd134c646-0a28-58d8-98d1-3f69870e6279',
        name: 'Vegetarian',
        thumb:
          'https://res.cloudinary.com/dpzujl2dr/image/upload/v1765389420/categories/cjz6fs2dazoqnxrypsae.jpg',
      },
      area: {
        id: 'a7b16c16-00e1-5d9a-bdd3-c61f145feb54',
        name: 'Egyptian',
      },
      owner: {
        id: 'c4ba056e-ae75-50ba-a3eb-95f5a1acace6',
        name: 'GoIT',
        avatar: null,
      },
    },
    {
      id: '82f270ce-2b34-574a-90fe-540976b37975',
      title: 'Strawberry Rhubarb Pie',
      instructions:
        "Pie Crust:  In a food processor, place the flour, salt, and sugar and process until combined. Add the butter and process until the mixture resembles coarse\r\n\r\nmeal (about 15 seconds). Pour 1/4 cup (60 ml) water in a slow, steady stream, through the feed tube until the dough just holds together when pinched. If necessary, add more water. Do not process more than 30 seconds.\r\nTurn the dough onto your work surface and gather into a ball. Divide the dough in half, flattening each half into a disk, cover with plastic wrap, and refrigerate for about one hour before using. This will chill the butter and relax the gluten in the flour. \r\n\r\nAfter the dough has chilled sufficiently, remove one portion of the dough from the fridge and place it on a lightly floured surface.  Roll the pastry into a 12 inch (30 cm) circle. (To prevent the pastry from sticking to the counter and to ensure uniform thickness, keep lifting up and turning the pastry a quarter turn as you roll (always roll from the center of the pastry outwards).)  Fold the dough in half and gently transfer to a 9 inch (23 cm) pie pan. Brush off any excess flour and trim any overhanging pastry to an edge of 1/2 inch (1.5 cm). Refrigerate the pastry, covered with plastic wrap, while you make the filling. \r\n\r\nRemove the second round of pastry and roll it into a 13 inch (30 cm) circle. Using a pastry wheel or pizza cutter, cut the pastry into about 3/4 inch (2 cm) strips. Place the strips of pastry on a parchment paper-lined baking sheet, cover with plastic wrap, and place in the refrigerator for about 10 minutes. \r\n\r\nMake the Strawberry Rhubarb Filling: Place the cut strawberries and rhubarb in a large bowl. In a small bowl mix together the cornstarch, sugar, and ground cinnamon. \r\n\r\nRemove the chilled pie crust from the fridge. Sprinkle about 2 tablespoons of the sugar mixture over the bottom of the pastry crust. Add the remaining sugar mixture to the strawberries and rhubarb and gently toss to combine. Pour the fruit mixture into the prepared pie shell. Sprinkle the fruit with about 1 teaspoon of lemon juice and dot with 2 tablespoons of butter.\r\n\r\nRemove the lattice pastry from the refrigerator and, starting at the center with the longest strips and working outwards, place half the strips, spacing about 1 inch (2.5 cm) apart, on top of the filling. (Use the shortest pastry strips at the outer edges.) Then, gently fold back, about halfway, every other strip of pastry. Take another strip of pastry and place it perpendicular on top of the first strips of pastry. Unfold the bottom strips of pastry and then fold back the strips that weren't folded back the first time. Lay another strip of pastry perpendicular on top of the filling and then continue with the remaining strips. Trim the edges of the pastry strips, leaving a 1 inch (2.5 cm) overhang. Seal the edges of the pastry strips by folding them under the bottom pastry crust and flute the edges of the pastry. Brush the lattice pastry with milk and sprinkle with a little sugar. Cover and place in the refrigerator while you preheat the oven to 400 degrees F (205 degrees C) and place the oven rack in the lower third of the oven. Put a baking sheet, lined with aluminum foil, on the oven rack (to catch any spills.)\r\n\r\nPlace the pie plate on the hot baking sheet and bake the pie for about 35 minutes and then, if the edges of the pie are browning too much, cover with a foil ring. Continue to bake the pie for about another 10 minutes or until the crust is a golden brown color and the fruit juices begin to bubble.\r\n\r\nRemove the pie from the oven and place on a wire rack to cool for several hours. Serve at room temperature with softly whipped cream or vanilla ice cream. Leftovers can be stored in the refrigerator for about 3 days. Reheat before serving. This pie can be frozen.\r\n\r\nMakes one 9 inch (23 cm) pie.",
      thumb:
        'https://ftp.goit.study/img/so-yummy/preview/Strawberry%20Rhubarb%20Pie.jpg',
      time: '170 min',
      ownerId: 'c4ba056e-ae75-50ba-a3eb-95f5a1acace6',
      categoryId: '2f3729dd-6dab-5904-bbc8-5bc4f57c8009',
      areaId: 'eb9c66c1-bbd1-55f1-9ed4-8a4a3ad0d4bf',
      created_at: '2025-12-10T17:33:50.372Z',
      updated_at: '2025-12-10T17:33:50.372Z',
      category: {
        id: '2f3729dd-6dab-5904-bbc8-5bc4f57c8009',
        name: 'Dessert',
        thumb:
          'https://res.cloudinary.com/dpzujl2dr/image/upload/v1765389412/categories/kq4rpxgixme8emsojhwy.jpg',
      },
      area: {
        id: 'eb9c66c1-bbd1-55f1-9ed4-8a4a3ad0d4bf',
        name: 'British',
      },
      owner: {
        id: 'c4ba056e-ae75-50ba-a3eb-95f5a1acace6',
        name: 'GoIT',
        avatar: null,
      },
    },
    {
      id: '1b32dafb-124a-5548-b648-15cf246f36f7',
      title: 'Madeira Cake',
      instructions:
        'Pre-heat the oven to 180C/350F/Gas 4. Grease an 18cm/7in round cake tin, line the base with greaseproof paper and grease the paper.\r\nCream the butter and sugar together in a bowl until pale and fluffy. Beat in the eggs, one at a time, beating the mixture well between each one and adding a tablespoon of the flour with the last egg to prevent the mixture curdling.\r\nSift the flour and gently fold in, with enough milk to give a mixture that falls slowly from the spoon. Fold in the lemon zest.\r\nSpoon the mixture into the prepared tin and lightly level the top. Bake on the middle shelf of the oven for 30-40 minutes, or until golden-brown on top and a skewer inserted into the centre comes out clean.\r\nRemove from the oven and set aside to cool in the tin for 10 minutes, then turn it out on to a wire rack and leave to cool completely.\r\nTo serve, decorate the cake with the candied peel.',
      thumb: 'https://ftp.goit.study/img/so-yummy/preview/Madeira%20Cake.jpg',
      time: '40 min',
      ownerId: 'c4ba056e-ae75-50ba-a3eb-95f5a1acace6',
      categoryId: '2f3729dd-6dab-5904-bbc8-5bc4f57c8009',
      areaId: 'eb9c66c1-bbd1-55f1-9ed4-8a4a3ad0d4bf',
      created_at: '2025-12-10T17:33:50.074Z',
      updated_at: '2025-12-10T17:33:50.074Z',
      category: {
        id: '2f3729dd-6dab-5904-bbc8-5bc4f57c8009',
        name: 'Dessert',
        thumb:
          'https://res.cloudinary.com/dpzujl2dr/image/upload/v1765389412/categories/kq4rpxgixme8emsojhwy.jpg',
      },
      area: {
        id: 'eb9c66c1-bbd1-55f1-9ed4-8a4a3ad0d4bf',
        name: 'British',
      },
      owner: {
        id: 'c4ba056e-ae75-50ba-a3eb-95f5a1acace6',
        name: 'GoIT',
        avatar: null,
      },
    },
    {
      id: '3bfd1bbc-8457-5ff9-b55a-96eef99e2047',
      title: 'Rosół (Polish Chicken Soup)',
      instructions:
        'Add chicken to a large Dutch oven or stock pot \r\nCover with water\r\nBring to a boil and simmer for 2 to 2 1/2 hours, skimming any impurities off the top to insure a clear broth\r\nIf your pot is big enough, add the vegetables and spices for the last hour of the cooking time\r\nMy Dutch oven wasn\'t big enough to hold everything, just the chicken and other bones filled the pot, so I cooked the meat/bones for the full cooking time, then removed them, and cooked the vegetables and spices separately\r\nStrain everything out of the broth\r\nBone the chicken, pulling the meat into large chunks\r\nSlice the carrots\r\nReturn the chicken and carrots to the broth\r\nCook noodles according to package instructions if you\'re using them\r\nAdd noodles to bowl and then top with hot soup',
      thumb:
        'https://ftp.goit.study/img/so-yummy/preview/Rosół%20(Polish%20Chicken%20Soup).jpg',
      time: '150 min',
      ownerId: 'c4ba056e-ae75-50ba-a3eb-95f5a1acace6',
      categoryId: 'a63e55d4-a7d3-55cc-89a9-9e8b55d32105',
      areaId: '24f787a3-3527-5326-83ac-e27ec5b4034f',
      created_at: '2025-12-10T17:33:49.460Z',
      updated_at: '2025-12-10T17:33:49.460Z',
      category: {
        id: 'a63e55d4-a7d3-55cc-89a9-9e8b55d32105',
        name: 'Chicken',
        thumb:
          'https://res.cloudinary.com/dpzujl2dr/image/upload/v1765390151/categories/jbulqcwk5cntcfeduggq.jpg',
      },
      area: {
        id: '24f787a3-3527-5326-83ac-e27ec5b4034f',
        name: 'Polish',
      },
      owner: {
        id: 'c4ba056e-ae75-50ba-a3eb-95f5a1acace6',
        name: 'GoIT',
        avatar: null,
      },
    },
    {
      id: '2168aa32-0aac-5680-a2a7-694fe0fe7434',
      title: 'Corned Beef and Cabbage',
      instructions: '1\r\n\r\nPlace corned beef in large pot or Dutch oven and cover with water. Add the spice packet that came with the corned beef. Cover pot and bring to a boil, then reduce to a simmer. Simmer approximately 50 minutes per pound or until tender.\r\n\r\n2\r\n\r\nAdd whole potatoes and peeled and cut carrots, and cook until the vegetables are almost tender. Add cabbage and cook for 15 more minutes. Remove meat and let rest 15 minutes.\r\n\r\n3\r\n\r\nPlace vegetables in a bowl and cover. Add as much broth (cooking liquid reserved in the Dutch oven or large pot) as you want. Slice meat across the grain.',
      thumb:
        'https://ftp.goit.study/img/so-yummy/preview/Corned%20Beef%20and%20Cabbage.jpg',
      time: '80 min',
      ownerId: 'c4ba056e-ae75-50ba-a3eb-95f5a1acace6',
      categoryId: '60ad0f05-19ce-5694-8cf7-f9a380502e93',
      areaId: 'b5e98849-7c43-507d-8557-14b8bfd167f3',
      created_at: '2025-12-10T17:33:49.285Z',
      updated_at: '2025-12-10T17:33:49.285Z',
      category: {
        id: '60ad0f05-19ce-5694-8cf7-f9a380502e93',
        name: 'Beef',
        thumb:
          'https://res.cloudinary.com/dpzujl2dr/image/upload/v1765390154/categories/yu9giba48ihwnijo2ff6.jpg',
      },
      area: {
        id: 'b5e98849-7c43-507d-8557-14b8bfd167f3',
        name: 'Irish',
      },
      owner: {
        id: 'c4ba056e-ae75-50ba-a3eb-95f5a1acace6',
        name: 'GoIT',
        avatar: null,
      },
    },
  ],
  total: 285,
  page: 1,
  limit: 10,
  totalPages: 29,
};

// mockData.recipes.length = 0;

export default function RecipeList() {
  const location = useLocation();
  const [data, setData] = useState({ recipes: [], total: 0 });
  const currentRoute = location.pathname.split('/').pop();

  useEffect(() => {
    if (currentRoute.endsWith(ROUTES.RECIPES_MY)) setData(mockData);
    else if (currentRoute.endsWith(ROUTES.RECIPES_FAVORITES)) setData(mockData);
  }, [location]);

  if (data.total === 0)
    return (
      <p className="font-medium text-sm md:text-base leading-[143%] md:leading-[150%] tracking-[-0.02em] text-center text-[#bfbebe] md:text-[#1a1a1a] mt-20 md:mt-[100px]">
        {currentRoute.endsWith(ROUTES.RECIPES_MY)
          ? EMPTY_LIST_MESSAGES.RECIPES_MY
          : EMPTY_LIST_MESSAGES.FAVORITES_MY}
      </p>
    );

  return (
    <ul className="flex flex-col gap-8 md:gap-10">
      {data.recipes.map(recipe => (
        <li key={recipe.id}>
          <RecipePreviewItem recipe={recipe} />
        </li>
      ))}
    </ul>
  );
}
