import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { CreditCard, CheckCircle, ArrowRight, DollarSign, TrendingUp, Users, Calculator, Phone, Mail } from 'lucide-react';

const DebtSolutionsPage = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Lower Interest Rates',
      description: 'Consolidate high-interest debt into lower-rate solutions, reducing your overall interest burden.'
    },
    {
      icon: TrendingUp,
      title: 'Improved Cash Flow',
      description: 'Reduce monthly payments and free up cash for other financial goals and emergencies.'
    },
    {
      icon: Users,
      title: 'Credit Score Improvement',
      description: 'Strategic debt management can help improve your credit score over time.'
    },
    {
      icon: Calculator,
      title: 'Simplified Payments',
      description: 'Combine multiple payments into one convenient monthly payment.'
    }
  ];

  const debtTypes = [
    {
      type: 'Credit Card Debt',
      description: 'High-interest revolving debt',
      averageRate: '18-29%',
      solution: 'Debt consolidation loan or balance transfer'
    },
    {
      type: 'Personal Loans',
      description: 'Unsecured loans with fixed payments',
      averageRate: '6-36%',
      solution: 'Refinancing or consolidation'
    },
    {
      type: 'Medical Debt',
      description: 'Unexpected healthcare expenses',
      averageRate: 'Varies',
      solution: 'Payment plans or consolidation'
    },
    {
      type: 'Student Loans',
      description: 'Educational debt with various terms',
      averageRate: '3-7%',
      solution: 'Refinancing or income-driven plans'
    }
  ];

  const solutions = [
    {
      title: 'Debt Consolidation Loans',
      description: 'Combine multiple debts into one loan with a lower interest rate',
      features: ['Fixed interest rates', 'Predictable monthly payments', 'Faster payoff timeline', 'No collateral required'],
      pros: ['Lower interest rates', 'Simplified payments', 'Fixed terms'],
      cons: ['Requires good credit', 'Origination fees possible']
    },
    {
      title: 'Balance Transfer Cards',
      description: 'Transfer high-interest debt to a card with promotional 0% APR',
      features: ['0% introductory APR', '12-21 month promotional periods', 'No interest during promo', 'Online management'],
      pros: ['No interest during promo', 'Potential savings', 'Credit building'],
      cons: ['High rates after promo', 'Transfer fees', 'Credit requirements']
    },
    {
      title: 'Home Equity Solutions',
      description: 'Use your home equity to pay off high-interest debt',
      features: ['Lower interest rates', 'Tax-deductible interest', 'Large loan amounts', 'Fixed or variable rates'],
      pros: ['Lowest rates available', 'Tax benefits', 'Large amounts'],
      cons: ['Home as collateral', 'Closing costs', 'Risk of foreclosure']
    },
    {
      title: 'Debt Management Plans',
      description: 'Work with creditors to reduce rates and create payment plans',
      features: ['Negotiated lower rates', 'Waived fees', 'Professional guidance', 'Credit counseling'],
      pros: ['Professional help', 'Lower payments', 'Avoid bankruptcy'],
      cons: ['Credit impact', 'Monthly fees', 'Time commitment']
    }
  ];

  const whoNeedsIt = [
    'Individuals with high-interest credit card debt',
    'People struggling with multiple monthly payments',
    'Those with good credit seeking lower rates',
    'Homeowners with equity available',
    'Anyone wanting to improve their credit score',
    'People seeking to become debt-free faster'
  ];

  const debtCalculator = {
    example: {
      totalDebt: 25000,
      currentRate: 22,
      currentPayment: 750,
      newRate: 8,
      newPayment: 550,
      monthlySavings: 200,
      interestSavings: 15000
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-16 h-16 rounded-xl flex items-center justify-center">
                  <CreditCard className="h-8 w-8 text-black" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-black">Debt Solutions</h1>
                  <p className="text-lg text-gray-600">Break Free from High-Interest Debt</p>
                </div>
              </div>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Take control of your financial future with our comprehensive debt solutions. 
                We help you consolidate high-interest debt, lower your monthly payments, 
                and create a clear path to financial freedom.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-4 rounded-xl shadow-md text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">$200+</div>
                  <div className="text-gray-600 text-sm">Average Monthly Savings</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">50%+</div>
                  <div className="text-gray-600 text-sm">Interest Rate Reduction</div>
                </div>
              </div>

              <a
                href="/contact"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-yellow-700 transition-colors duration-300 inline-flex items-center space-x-2"
              >
                <span>Get Free Analysis</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Person calculating debt and financial planning"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl shadow-xl">
                <div className="text-black font-bold text-lg">Debt</div>
                <div className="text-black font-bold text-lg">Freedom</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Benefits of Debt Consolidation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our debt solutions provide immediate relief and long-term financial benefits 
              to help you regain control of your finances.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-lg font-bold text-black mb-3">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Debt Types Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Common Types of Debt</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide solutions for various types of debt, helping you tackle high-interest obligations 
              and create a manageable payment structure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {debtTypes.map((debt, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold text-black mb-3">{debt.type}</h3>
                <p className="text-gray-600 mb-4 text-sm">{debt.description}</p>
                <div className="bg-red-50 p-3 rounded-lg mb-4">
                  <p className="text-sm font-medium text-red-700">Average Rate:</p>
                  <p className="text-lg font-bold text-red-600">{debt.averageRate}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-green-700">Our Solution:</p>
                  <p className="text-sm text-green-600">{debt.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Our Debt Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from multiple debt consolidation strategies designed to fit your specific 
              financial situation and goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-black mb-4">{solution.title}</h3>
                <p className="text-gray-600 mb-6">{solution.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-bold text-black mb-3">Features:</h4>
                  <div className="space-y-2">
                    {solution.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-green-700 mb-2">Pros:</p>
                    {solution.pros.map((pro, idx) => (
                      <p key={idx} className="text-xs text-green-600">• {pro}</p>
                    ))}
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-red-700 mb-2">Cons:</p>
                    {solution.cons.map((con, idx) => (
                      <p key={idx} className="text-xs text-red-600">• {con}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Savings Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Potential Savings Example</h2>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-red-700 mb-4">Before: High-Interest Debt</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Total Debt:</span>
                    <span className="font-bold">${debtCalculator.example.totalDebt.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Average Rate:</span>
                    <span className="font-bold text-red-600">{debtCalculator.example.currentRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Monthly Payment:</span>
                    <span className="font-bold">${debtCalculator.example.currentPayment}</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-green-700 mb-4">After: Consolidated Debt</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Total Debt:</span>
                    <span className="font-bold">${debtCalculator.example.totalDebt.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">New Rate:</span>
                    <span className="font-bold text-green-600">{debtCalculator.example.newRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Monthly Payment:</span>
                    <span className="font-bold">${debtCalculator.example.newPayment}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center bg-yellow-50 p-6 rounded-xl">
              <h4 className="text-2xl font-bold text-black mb-4">Your Potential Savings</h4>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-3xl font-bold text-yellow-600">${debtCalculator.example.monthlySavings}/month</p>
                  <p className="text-gray-600">Monthly Savings</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-yellow-600">${debtCalculator.example.interestSavings.toLocaleString()}</p>
                  <p className="text-gray-600">Total Interest Savings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Needs It Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6">Who Can Benefit from Debt Solutions?</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Our debt solutions are designed for anyone struggling with high-interest debt 
                who wants to regain control of their finances and build a stronger financial future.
              </p>

              <div className="space-y-4">
                {whoNeedsIt.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-black to-gray-900 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Start Your Journey to Debt Freedom</h3>
              <p className="text-gray-300 mb-6">
                Our debt specialists will analyze your current situation and create a customized 
                plan to help you eliminate high-interest debt and improve your financial health.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-yellow-400" />
                  <span>(972) 805-1002</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-yellow-400" />
                  <span>admin@eibagency.com</span>
                </div>
              </div>

              <a
                href="/contact"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-lg font-bold hover:from-yellow-600 hover:to-yellow-700 transition-colors duration-300 inline-block w-full text-center"
              >
                Get Free Debt Analysis
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DebtSolutionsPage;