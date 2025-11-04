import { Unit, Badge } from '../types';
import { Award, BarChart3, Bot, Sigma, TrendingUp, TestTube } from 'lucide-react';

export const UNITS: Unit[] = [
    {
        unitNumber: 0,
        title: 'Mathematical Prerequisites',
        duration: '1 week',
        prereqs: 'None (or high school math).',
        objectives: [
            'Manipulate sets, functions, and basic combinatorics.',
            'Use limits, derivatives, integrals, and linear algebra basics.',
        ],
        coreTopics: [
            { id: 'u0_t1', title: 'Set Theory & Mappings', content: 'Dive into the building blocks of modern mathematics. This topic covers the fundamentals of set theory, including operations like union, intersection, and complement. You\'ll learn about Cartesian products for combining sets, power sets for exploring all possible subsets, and the crucial concept of mappings (or functions) between sets.', chart: 'none' },
            { id: 'u0_t2', title: 'Counting Principles', content: 'Master the art of counting without counting. This topic introduces fundamental combinatorial principles, including permutations (arrangements) and combinations (selections). You\'ll explore the powerful inclusion-exclusion principle to count complex sets by systematically adding and subtracting overlapping elements.', chart: 'none' },
            { id: 'u0_t3', title: 'Real Analysis Review', content: 'Strengthen your calculus foundations. This topic revisits key concepts from real analysis, such as limits of sequences and functions, the formal definition of continuity, and their implications. A solid understanding of these ideas is essential for working with continuous probability distributions.', chart: 'none' },
            { id: 'u0_t4', title: 'Linear Algebra Refresher', content: 'Review the language of data. This topic provides a refresher on linear algebra essentials, including vectors, matrices, and matrix operations. We\'ll touch upon eigenvalues and eigenvectors, which are crucial for understanding multivariate statistics and dimensionality reduction techniques.', chart: 'none' },
        ],
        references: 'Mathematics for Machine Learning – Chapters 1-2; Principles of Mathematical Analysis (Rudin) – §1-2.',
        assessment: 'Worksheet on combinatorial problems, proofs of set identities, and a mini-project coding a combinatorial calculator.',
    },
    {
        unitNumber: 1,
        title: 'Foundations of Probability',
        duration: '2 weeks',
        prereqs: 'Unit 0',
        objectives: [
            'State Kolmogorov’s axioms and construct probability spaces.',
            'Compute probabilities of simple events using counting and basic formulas.',
        ],
        coreTopics: [
            { id: 'u1_t1', title: 'Sample Spaces & Events', content: 'Begin your journey into probability by defining the universe of possibilities. Learn how to construct a sample space (the set of all possible outcomes), define events as subsets of this space, and understand the role of σ-algebras in creating a rigorous framework for assigning probabilities.', chart: 'none' },
            { id: 'u1_t2', title: 'Axioms of Probability', content: 'Discover the three fundamental rules that govern all of probability theory. This topic introduces Kolmogorov\'s axioms: non-negativity, normalization, and countable additivity. These simple axioms are the bedrock upon which the entire field is built.', chart: 'none' },
            { id: 'u1_t3', title: 'Interpretations of Probability', content: 'What does \'probability\' actually mean? Explore the different philosophical interpretations, from the classical (equally likely outcomes) and relative frequency (long-run proportions) viewpoints to the subjective (degree of belief) perspective.', chart: 'none' },
            { id: 'u1_t4', title: 'Conditional Probability & Bayes’ Theorem', content: 'Learn how to update your beliefs in light of new evidence. This topic introduces conditional probability, the probability of an event given that another event has occurred. You\'ll then master the celebrated Bayes\' Theorem, a powerful formula for reversing conditional probabilities and performing statistical inference.', chart: 'none' },
            { id: 'u1_t5', title: 'Independence of Events', content: 'Explore the concept of events that don\'t influence each other. This topic formally defines statistical independence and explores its consequences. Understanding independence is key to simplifying complex problems and modeling many real-world phenomena.', chart: 'none' },
        ],
        references: 'Ross – A First Course in Probability (Ch. 1-3).',
        assessment: 'Problem set on dice, cards, urn models, and Bayes’ theorem applications.',
    },
    {
        unitNumber: 2,
        title: 'Discrete Random Variables & Distributions',
        duration: '2 weeks',
        prereqs: 'Unit 1',
        objectives: [
            'Define pmf, cdf, expectation for discrete RVs.',
            'Model real-world counting processes.',
        ],
        coreTopics: [
            { id: 'u2_t1', title: 'Discrete RVs', content: 'Move from events to numerical outcomes. This topic introduces discrete random variables, which take on a countable number of values. You\'ll learn to describe their behavior using probability mass functions (pmf) and cumulative distribution functions (cdf).', chart: 'none' },
            { id: 'u2_t2', title: 'Expectation & Variance', content: 'Summarize random variables with key metrics. Learn to calculate the expectation (the long-run average), variance, and standard deviation (measures of spread). We\'ll also introduce moments and generating functions as powerful tools for characterizing distributions.', chart: 'none' },
            { id: 'u2_t3', title: 'Common Discrete Distributions', content: 'Meet the \'families\' of discrete distributions used to model countless real-world scenarios. This topic covers the Bernoulli, Binomial, Poisson, Geometric, Negative Binomial, and Hypergeometric distributions, detailing their properties and applications.', chart: 'none' },
            { id: 'u2_t4', title: 'Sums of Independent RVs', content: 'What happens when you combine random variables? Learn how to find the distribution of a sum of independent random variables using the method of convolutions. This is a fundamental technique with wide-ranging applications.', chart: 'none' },
        ],
        references: 'Ross – Ch. 4-5; Grimmett & Stirzaker – Probability and Random Processes.',
        assessment: 'Compute expectations, variances, and MGFs; simulate Poisson arrivals in R/Python.',
    },
    {
        unitNumber: 3,
        title: 'Continuous Random Variables & Distributions',
        duration: '2 weeks',
        prereqs: 'Unit 2, calculus (differentiation & integration).',
        objectives: [
            'Work with pdfs, cdfs, and transformation techniques.',
            'Apply continuous distributions to real-world phenomena.',
        ],
        coreTopics: [
            { id: 'u3_t1', title: 'Continuous RVs', content: 'Explore variables that can take any value within a range, like height or temperature. This topic defines continuous random variables and introduces their key descriptors: the probability density function (pdf) and the cumulative distribution function (cdf).', chart: 'none' },
            { id: 'u3_t2', title: 'Expectation & Change of Variables', content: 'Extend the concepts of expectation and variance to the continuous case using integration. You\'ll also learn the powerful change of variables formula (using the Jacobian) to find the distribution of a function of a random variable.', chart: 'none' },
            { id: 'u3_t3', title: 'Common Continuous Distributions', content: 'Discover the most important distributions for modeling continuous phenomena. This topic covers the Uniform, Exponential, Gamma, Beta, and, most famously, the Normal (or Gaussian) distribution, which is central to statistics.', chart: 'normal_distribution' },
            { id: 'u3_t4', title: 'Joint Distributions', content: 'Analyze multiple random variables simultaneously. This topic introduces joint pdfs for describing the behavior of two or more continuous random variables. You\'ll learn how to compute marginal distributions to study one variable and conditional distributions to understand their relationships.', chart: 'none' },
        ],
        references: 'Ross – Ch. 6-7; Casella & Berger – Statistical Inference.',
        assessment: 'Derive pdf of sum of independent exponentials; use Monte Carlo estimation.',
    },
    {
        unitNumber: 4,
        title: 'Multivariate Probability',
        duration: '2 weeks',
        prereqs: 'Units 2-3',
        objectives: [
            'Model joint behavior of several RVs.',
            'Understand dependence structures (covariance, correlation, copulas).',
        ],
        coreTopics: [
            { id: 'u4_t1', title: 'Joint & Marginal Distributions', content: 'Deepen your understanding of multiple random variables. This topic formalizes the concepts of joint, marginal, and conditional distributions for both discrete and continuous multivariate cases, providing the tools to analyze complex systems.', chart: 'none' },
            { id: 'u4_t2', title: 'Covariance & Correlation', content: 'Go beyond independence and quantify the relationship between variables. Learn to compute covariance and correlation, which measure the direction and strength of a linear relationship. This forms the basis for understanding regression.', chart: 'none' },
            { id: 'u4_t3', title: 'Multivariate Normal Distribution', content: 'Meet the king of multivariate distributions. The multivariate normal distribution is a generalization of the bell curve to higher dimensions and is fundamental to many statistical models. We\'ll explore its elegant properties, including how its marginals and conditionals are also normal.', chart: 'none' },
            { id: 'u4_t4', title: 'Transformation of Vectors', content: 'What is the distribution of functions of multiple random variables? This topic introduces the multivariate change of variables formula, using the Jacobian determinant to find the joint pdf of transformed random vectors.', chart: 'none' },
        ],
        references: 'Anderson – An Introduction to Multivariate Statistical Analysis; Ross – sections on joint distributions.',
        assessment: 'Compute conditional distributions for a bivariate normal; simulate a 3D Gaussian.',
    },
    {
        unitNumber: 5,
        title: 'Expectation, Moments & Inequalities',
        duration: '1 week',
        prereqs: 'Units 2-4',
        objectives: ['Master tools for bounding probabilities and expectations.'],
        coreTopics: [
            { id: 'u5_t1', title: 'Advanced Expectation', content: 'Explore powerful theorems related to expectation. The Law of the Unconscious Statistician (LOTUS) simplifies finding the expectation of a function of a random variable, while the law of iterated expectations provides a way to calculate expectations by conditioning.', chart: 'none' },
            { id: 'u5_t2', title: 'Key Inequalities', content: 'Master a toolkit of inequalities for bounding probabilities when exact calculations are difficult. This topic covers Markov\'s, Chebyshev\'s, and Jensen\'s inequalities, each providing a different way to control the behavior of random variables.', chart: 'none' },
            { id: 'u5_t3', title: 'Applications to Tail Bounds', content: 'Use inequalities to answer crucial questions about rare events. Learn how Chernoff and Hoeffding bounds provide exponentially decreasing estimates for the probability that a sum of random variables deviates far from its mean, a key concept in risk assessment and machine learning.', chart: 'none' },
        ],
        references: 'Durrett – Probability: Theory and Examples (Chapter 1, Section 1.6).',
        assessment: 'Prove Chebyshev’s inequality; apply Chernoff bound to Binomial tails.',
    },
     {
        unitNumber: 6,
        title: 'Classical Limit Theorems',
        duration: '2 weeks',
        prereqs: 'Units 1-5',
        objectives: ['Understand convergence concepts and the foundations of inferential statistics.'],
        coreTopics: [
            { id: 'u6_t1', title: 'Types of Convergence', content: 'How do we talk about a sequence of random variables \'approaching\' something? This topic introduces the different modes of convergence: in probability, almost sure, in distribution, and in Lp, and explores the relationships between them.', chart: 'none' },
            { id: 'u6_t2', title: 'Laws of Large Numbers', content: 'Discover why averages stabilize in the long run. The Weak and Strong Laws of Large Numbers (WLLN, SLLN) are cornerstone theorems that guarantee the sample mean converges to the true population mean, providing the theoretical foundation for Monte Carlo simulation and estimation.', chart: 'none' },
            { id: 'u6_t3', title: 'Central Limit Theorem', content: 'Uncover the magic of the bell curve. The Central Limit Theorem (CLT) states that, under general conditions, the sum (or average) of a large number of independent random variables will be approximately normally distributed, regardless of the original distribution. This is arguably the most important theorem in all of probability and statistics.', chart: 'none' },
        ],
        references: 'Billingsley – Probability and Measure (Ch. 2); Durrett – Chapter 2.',
        assessment: 'Prove WLLN for i.i.d. bounded RVs; simulate CLT for various distributions.',
    },
    {
        unitNumber: 7,
        title: 'Introduction to Measure Theory & Lebesgue Integration',
        duration: '3 weeks',
        prereqs: 'Unit 0, calculus, basic set theory; (optional: a first course in real analysis).',
        objectives: [
            'Build a rigorous foundation for probability as a measure on a σ-algebra.',
            'Master Lebesgue integration, which underpins modern probability.'
        ],
        coreTopics: [
            { id: 'u7_t1', title: 'σ-algebras & Measurable Spaces', content: 'This topic lays the formal groundwork for modern probability. A σ-algebra is a collection of subsets (events) that is stable under countable set operations. Paired with a sample space, it forms a measurable space, the stage upon which we can define a measure—a function that assigns a non-negative size (like length, area, or probability) to each event in a consistent way.', chart: 'none' },
            { id: 'u7_t2', title: 'Outer Measure & Carathéodory’s Theorem', content: 'How do we construct measures on complex spaces like the real line? We start with a simpler concept, an outer measure, which can assign a size to *any* subset. Carathéodory\'s extension theorem provides a powerful, general method to select a σ-algebra of \'well-behaved\' measurable sets on which the outer measure becomes a true, countably additive measure.', chart: 'none' },
            { id: 'u7_t3', title: 'Measurable Functions & Integration', content: 'A function is \'measurable\' if it respects the structure of our measurable spaces, ensuring we can meaningfully ask probability questions about its values. We build the concept of the Lebesgue integral from the ground up, starting with simple functions (which act like step functions) and then extending the definition to more complex, non-negative measurable functions.', chart: 'none' },
            { id: 'u7_t4', title: 'Convergence Theorems (MCT, DCT, Fatou)', content: 'These are the three workhorse theorems of Lebesgue integration, allowing us to interchange the order of limits and integrals under certain conditions—a notoriously difficult problem in Riemann integration. The Monotone Convergence Theorem (MCT), Dominated Convergence Theorem (DCT), and Fatou\'s Lemma are essential tools for proving limit theorems in probability.', chart: 'none' },
            { id: 'u7_t5', title: 'Lebesgue Measure & Product Measures', content: 'The Lebesgue measure is the standard way to assign \'length\', \'area\', or \'volume\' to subsets of Euclidean space (ℝⁿ). To handle multiple random variables, we need product measures. The theorems of Fubini and Tonelli provide the conditions under which we can calculate multi-dimensional integrals as iterated, one-dimensional integrals, simplifying complex calculations.', chart: 'none' }
        ],
        references: 'Folland – Real Analysis (Ch. 1-2); Billingsley – Probability and Measure (Chapter 1).',
        assessment: 'Prove DCT and apply it to exchange limit & expectation; construct Lebesgue measure via Carathéodory.'
    },
    {
        unitNumber: 8,
        title: 'Probability in a Measure Theoretic Setting',
        duration: '2 weeks',
        prereqs: 'Unit 7',
        objectives: [
            'Translate discrete/continuous probability concepts into the measure theoretic language.',
            'Handle expectations, conditional expectations, independence, and distributions rigorously.'
        ],
        coreTopics: [
            { id: 'u8_t1', title: 'Probability Spaces & Random Variables', content: 'Here, we formalize the concepts from Unit 1. A probability space is a triplet (Ω, 𝔽, ℙ) consisting of a sample space, a σ-algebra of events, and a probability measure. A random variable is no longer just a variable, but a precisely defined measurable function that maps outcomes from the sample space Ω to the real numbers.', chart: 'none' },
            { id: 'u8_t2', title: 'Distribution & Law of a RV', content: 'The \'distribution\' or \'law\' of a random variable is a new probability measure created on the real line. It\'s formed by \'pushing forward\' the probability measure ℙ from the original sample space Ω via the random variable map. This tells us the probability of the random variable taking values in any given set of real numbers.', chart: 'none' },
            { id: 'u8_t3', title: 'Expectation as Lebesgue Integral', content: 'Expectation gets a rigorous new definition. The expected value of a random variable is simply its Lebesgue integral with respect to the probability measure ℙ over the sample space Ω. This powerful definition unifies the discrete (sum) and continuous (Riemann integral) cases and handles much more general situations.', chart: 'none' },
            { id: 'u8_t4', title: 'Independence of σ-algebras & RVs', content: 'Independence is generalized from events to σ-algebras. Two random variables are independent if their generated σ-algebras are independent. This formalism allows us to use product measures to describe the joint law of independent random variables, leading to Kolmogorov\'s extension theorem for constructing infinite sequences of independent RVs.', chart: 'none' },
            { id: 'u8_t5', title: 'Conditional Expectation', content: 'Conditional expectation is redefined as a random variable itself, representing the best possible estimate of one variable given information about another (represented by a σ-algebra). This abstract concept, defined via the Radon-Nikodym theorem, is fundamental to the study of martingales and stochastic processes.', chart: 'none' }
        ],
        references: 'Durrett – Probability: Theory and Examples (Chapter 3); Kallenberg – Foundations of Modern Probability (Sections 1-2).',
        assessment: 'Formal proof that independence of σ-algebras implies factorization of expectations.'
    },
    {
        unitNumber: 9,
        title: 'Advanced Convergence & Refined Limit Theorems',
        duration: '2 weeks',
        prereqs: 'Units 6, 8',
        objectives: [
            'Deepen understanding of convergence modes, Lindeberg conditions, and functional limit theorems.'
        ],
        coreTopics: [
            { id: 'u9_t1', title: 'Borel-Cantelli Lemmas', content: 'We dive deeper into the modes of convergence. Almost sure convergence is a very strong form, meaning the sequence of random variables converges for all outcomes except possibly a set of probability zero. The Borel-Cantelli lemmas are key tools for determining whether an infinite sequence of events will occur with probability 0 or 1, which is crucial for proving almost sure convergence.', chart: 'none' },
            { id: 'u9_t2', title: 'Skorokhod Representation Theorem', content: 'This is a remarkable and powerful result connecting convergence in distribution to almost sure convergence. It states that if a sequence of random variables converges in distribution, we can construct a new probability space and a new sequence of random variables with the same distributions that converges almost surely. This allows us to prove many theorems by assuming the stronger, more convenient form of convergence.', chart: 'none' },
            { id: 'u9_t3', title: 'Lindeberg-Feller Central Limit Theorem', content: 'This is the most general and powerful version of the Central Limit Theorem. It provides necessary and sufficient conditions (the Lindeberg condition) for the sum of independent, but not necessarily identically distributed, random variables in a triangular array to converge to a normal distribution. The Lyapunov condition is a simpler, sufficient condition that is often easier to check.', chart: 'none' },
            { id: 'u9_t4', title: 'Functional CLT (Donsker’s Principle)', content: 'This theorem is a monumental extension of the CLT. Instead of just the sum of random variables converging to a single normal random variable, Donsker\'s theorem shows that an entire random process (a properly scaled random walk) converges in distribution to a continuous-time process: Brownian motion. This is the foundation of stochastic calculus.', chart: 'none' }
        ],
        references: 'Billingsley – Convergence of Probability Measures (Ch. 2-3); Durrett – Chapter 2, Section 2.4.',
        assessment: 'Verify Lindeberg condition for a given array of RVs; simulate Donsker’s theorem.'
    },
    {
        unitNumber: 10,
        title: 'Martingales, Stopping Times & Optional Sampling',
        duration: '2 weeks',
        prereqs: 'Unit 8, basic measure theory, conditional expectation.',
        objectives: [
            'Understand martingale structures, powerful inequalities, and their role in modern probability.'
        ],
        coreTopics: [
            { id: 'u10_t1', title: 'Filtrations, Adapted Processes, & Martingales', content: 'We introduce the concept of a filtration, which is an increasing sequence of σ-algebras representing the flow of information over time. A process is \'adapted\' to a filtration if its value at any time is known given the information up to that time. A martingale is an adapted process whose expected future value, given the present information, is equal to its current value—the model of a \'fair game\'.', chart: 'none' },
            { id: 'u10_t2', title: 'Martingale Convergence Theorems', content: 'These are the central limit theorems for martingales. They provide conditions under which a martingale is guaranteed to converge to a limit as time goes to infinity. Doob\'s upcrossing inequality is the key technical tool used to prove the main convergence theorem for submartingales.', chart: 'none' },
            { id: 'u10_t3', title: 'Optional Stopping Theorem', content: 'The Optional Stopping Theorem is a crucial result stating conditions under which the expected value of a martingale at a random \'stopping time\' is equal to its initial expected value. Doob\'s maximal inequalities provide powerful bounds on the maximum value a martingale is likely to attain, which are essential for many applications.', chart: 'none' },
            { id: 'u10_t4', title: 'Azuma–Hoeffding Inequality', content: 'A martingale transform involves using a predictable process (a \'betting strategy\') to create a new martingale from an old one. The Azuma-Hoeffding inequality is a powerful concentration inequality for martingales with bounded differences, providing exponential tail bounds similar to the Chernoff bound but in a much more general setting.', chart: 'none' },
            { id: 'u10_t5', title: 'Applications of Martingales', content: 'Martingale theory has a vast range of applications. It provides a rigorous framework for analyzing gambling strategies (proving you can\'t beat a fair game), gives simple proofs for convergence of series, and offers one of the most elegant proofs of the Strong Law of Large Numbers (SLLN).', chart: 'none' }
        ],
        references: 'Williams – Probability with Martingales (entire book).',
        assessment: 'Prove Doob’s optional stopping for bounded stopping time; use Azuma inequality to bound deviation.'
    },
    {
        unitNumber: 11,
        title: 'Discrete Time Stochastic Processes (Markov Chains)',
        duration: '2 weeks',
        prereqs: 'Unit 10 (martingale intuition optional), basic linear algebra.',
        objectives: [
            'Model and analyze memoryless processes in discrete time.'
        ],
        coreTopics: [
            { id: 'u11_t1', title: 'Definition of a Markov Chain', content: 'A Markov chain is a stochastic process that possesses the \'memoryless\' property: the future state depends only on the current state, not on the path taken to get there. Its dynamics are completely described by a transition matrix, and the Chapman-Kolmogorov equations provide a way to calculate the probability of moving between states in multiple time steps.', chart: 'none' },
            { id: 'u11_t2', title: 'Classification of States', content: 'We can classify the states of a Markov chain based on their long-term behavior. A state is recurrent if the chain is guaranteed to return to it eventually, and transient if it may never return. We also define periodicity and absorbing states, which helps us decompose the chain into fundamental building blocks.', chart: 'none' },
            { id: 'u11_t3', title: 'Stationary Distributions & Ergodicity', content: 'A stationary distribution is a probability distribution over the states that remains unchanged after one step of the chain. If a chain is ergodic (irreducible and aperiodic), it has a unique stationary distribution that describes the long-run proportion of time spent in each state, regardless of the starting state. The detailed balance condition is a useful criterion for checking if a distribution is stationary.', chart: 'none' },
            { id: 'u11_t4', title: 'First Passage & Hitting Times', content: 'These are key metrics for understanding the transient behavior of a Markov chain. The hitting probability is the probability that the chain, starting from one state, will ever reach another. The first passage time is the expected number of steps it takes to do so. These quantities are often calculated by solving systems of linear equations.', chart: 'none' },
            { id: 'u11_t5', title: 'Applications of Markov Chains', content: 'Markov chains are ubiquitous. They are used to model random walks on graphs, form the core of Google\'s PageRank algorithm for ranking web pages, and describe processes in population genetics like the Moran model for genetic drift.', chart: 'none' }
        ],
        references: 'Norris – Markov Chains (chapters 1-3); Levin, Peres & Wilmer – Markov Chains and Mixing Times.',
        assessment: 'Compute stationary distribution for a given transition matrix; simulate a random walk on a grid.'
    },
    {
        unitNumber: 12,
        title: 'Continuous Time Stochastic Processes (Poisson & Renewal)',
        duration: '2 weeks',
        prereqs: 'Unit 11; basic measure theory.',
        objectives: [
            'Introduce point processes and renewal theory, the building blocks of continuous time models.'
        ],
        coreTopics: [
            { id: 'u12_t1', title: 'The Poisson Process', content: 'The Poisson process is the most fundamental continuous-time counting process. It can be constructed by assuming that the times between successive events (inter-arrival times) are independent and exponentially distributed. It is characterized by stationary and independent increments, meaning the number of events in disjoint time intervals are independent and depend only on the length of the intervals.', chart: 'none' },
            { id: 'u12_t2', title: 'Modifications of Poisson Processes', content: 'We can extend the basic Poisson process in several ways. A compound Poisson process allows each event to have a random \'size\'. Thinning involves keeping each event with a certain probability, creating a new, slower Poisson process. Superposition is the process of combining multiple independent Poisson processes, which results in a new Poisson process whose rate is the sum of the individual rates.', chart: 'none' },
            { id: 'u12_t3', title: 'Renewal Processes & Reward Theorem', content: 'A renewal process is a generalization of the Poisson process where the inter-arrival times are independent and identically distributed, but not necessarily exponential. The Renewal Reward Theorem is a powerful result that relates the long-run average reward of a system to the expected reward per cycle, with wide applications in optimization and reliability.', chart: 'none' },
            { id: 'u12_t4', title: 'Non-Homogeneous Poisson Processes', content: 'In many real-world scenarios, the rate of events is not constant over time. A non-homogeneous Poisson process accommodates this by replacing the constant rate with a time-varying intensity function. The expected number of events in an interval is then the integral of the intensity function over that interval.', chart: 'none' },
            { id: 'u12_t5', title: 'Applications in Queueing & Reliability', content: 'Continuous-time processes are vital for modeling real-world systems. The Poisson process is the foundation of basic queueing theory (like the M/M/1 queue), renewal theory is used to model the failure and replacement of components in reliability engineering, and compound Poisson processes are used to model the arrival of claims in insurance.', chart: 'none' }
        ],
        references: 'Ross – Stochastic Processes (chapters 5-6); Cinlar – Introduction to Stochastic Processes.',
        assessment: 'Derive the distribution of inter-arrival times; simulate an M/M/1 queue.'
    },
    {
        unitNumber: 24,
        title: 'Capstone Project / Research Exploration',
        duration: '2-4 weeks',
        prereqs: 'Completion of a substantial subset of Units 1-23.',
        objectives: ['Integrate theory, computation, and exposition into a self-contained project.'],
        coreTopics: [
            { id: 'u24_t1', title: 'Financial Modeling Project', content: 'Apply stochastic processes to finance. In this project, you\'ll choose a model like Geometric Brownian Motion or a jump-diffusion process and calibrate its parameters to real-world financial asset price data, exploring the challenges of model fitting and validation.', chart: 'none' },
            { id: 'u24_t2', title: 'High-Dimensional Inference Project', content: 'Explore the \'blessing of dimensionality\'. This project involves applying concentration inequalities (like Hoeffding\'s or Bernstein\'s) to analyze the performance of a statistical algorithm, such as sparse linear regression (Lasso) or compressed sensing, in a high-dimensional setting.', chart: 'none' },
            { id: 'u24_t3', title: 'Random Matrix Statistics Project', content: 'Investigate the surprising properties of large random matrices. You will numerically simulate the eigenvalues of specific random matrix ensembles (e.g., Wigner or Wishart matrices) and compare their empirical distribution to theoretical predictions like the Wigner semicircle law or the Marchenko-Pastur law.', chart: 'none' },
            { id: 'u24_t4', title: 'Bayesian Nonparametrics Project', content: 'Move beyond models with a fixed number of parameters. This project involves implementing a Bayesian nonparametric model, such as a Dirichlet process mixture model, to perform clustering on a dataset where the number of clusters is not known in advance.', chart: 'none' },
        ],
        references: 'Varies by project. See project descriptions for specific references.',
        assessment: 'Graded on (a) depth of probabilistic insight, (b) correctness of implementation, (c) clarity of exposition, (d) originality.',
    },
];


export const BADGES: Badge[] = [
    { id: 'novice', name: 'Stats Novice', description: 'Earn your first 100 points.', icon: Award, threshold: 100 },
    { id: 'apprentice', name: 'Data Apprentice', description: 'Earn 250 points.', icon: BarChart3, threshold: 250 },
    { id: 'journeyman', name: 'Probability Pro', description: 'Earn 500 points.', icon: Sigma, threshold: 500 },
    { id: 'expert', name: 'Distribution Diva', description: 'Earn 750 points.', icon: TrendingUp, threshold: 750 },
    { id: 'master', name: 'Hypothesis Hero', description: 'Earn 1000 points.', icon: TestTube, threshold: 1000 },
    { id: 'guru', name: 'Mean Master', description: 'Earn 1500 points.', icon: Bot, threshold: 1500 },
];