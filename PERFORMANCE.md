# Performance Test Strategy

To effectively performance test the DemoBlaze website, we have to consider the following major API call flows which can be segregated into below **4 types:**

1. Log In Flow
2. Sign up Flow.
3. Load products by each category
4. End to End Purchase flow

To Check in more details go to **PerformanceTest** folder and check `PerformanceTestStrategy.docx`

## API Details

1. **Login**
   - POST https://api.demoblaze.com/login
   - POST data: {"username":"test","password":"dGVzdA=="}

2. **Sign up**
   - POST https://api.demoblaze.com/signup
   - POST data: {"username":"BXVh7","password":"bmV3cnQ0NQ=="}

3. **Load Products by Category**
   - Phones
     - POST https://api.demoblaze.com/bycat
     - POST data: {"cat":"phone"}
   - Laptops
     - POST https://api.demoblaze.com/bycat
     - POST data: {"cat":"notebook"}
   - Monitors
     - POST https://api.demoblaze.com/bycat
     - POST data: {"cat":"monitor"}

4. **Purchase Flow**
   - Launch DemoBlaze Home
     - GET https://www.demoblaze.com/index.html
   - Click Category Phones
     - POST https://api.demoblaze.com/bycat
     - POST data: {"cat":"phone"}
   - View Product
     - POST https://api.demoblaze.com/view
     - POST data: {"id":"4"}
   - Add to Cart
     - POST https://api.demoblaze.com/addtocart
     - POST data: {"id":"b961685e-4fce-eece-0ba9-f39a28b60925","cookie":"user=ac542990-1835-67ed-bb86-7a280e9cb45f","prod_id":4,"flag":false}
   - View Cart
     - POST https://api.demoblaze.com/viewcart
     - POST data: {"cookie":"user=ac542990-1835-67ed-bb86-7a280e9cb45f","flag":false}
   - Purchase Product (Demo blaze just deletes the cart)
     - POST https://api.demoblaze.com/deletecart
     - POST data: {"cookie":"user=ac542990-1835-67ed-bb86-7a280e9cb45f"}

## Performance Test Script

1. The performance test script has been automated using **JMeter V5.6.2.**
2. The performance test automation script in `.jmx` format can be found in the `PerformanceTest` folder.
3. The script name is: `DemoBlazePerformanceTest.jmx.`
4. I have implemented all the major test scenarios as mentioned above.

## Set Up

1. Go to Apache official website: [https://jmeter.apache.org/download_jmeter.cgi](https://jmeter.apache.org/download_jmeter.cgi) to **download the latest version** of JMeter.
2. Download the zip file and unzip it anywhere you want in your system.
3. Go to bin folder and then open `jmeter.batch` file.
4. Make sure your machine has **Java installed.**
5. Once JMeter UI is launched you can click on `file>open and browse the DemoBlazePerformanceTest.jmx` in the Git repository and open and execute.
6. There are 4 thread groups each for the scenarios mentioned above.
7. Adjust the values of threads as per your load test configuration.

## Task: Execute Performance Tests (3 days)

**Load Test:** Demo blaze can handle expected user traffic.
- **Output:**
  - Get the anticipated traffic on Demo blaze website for every day in hits per second from the Product Owner/ Business stakeholders.
  - Perform the Load test to check if the application can handle the expected traffic.

**Stress Test:** To check for 20% more than anticipated traffic on the demo blaze website.
- **Output:**
  - Find the breakpoint of the application.
  - Check if application under stress can be scaled either horizontally or vertically.

**Spike Test:** Simulate a sudden spike or peak load on the application for APIs like add to cart and checkout.
- **Output:**
  - Check that the application can handle a sudden burst in traffic.
  - Check if we need to scale up the infra and deployment before the sale.
  - Check that the response time is not impacted.
  - Check the failure rate is <2% and user experience is not dropped.

**Soak Test:** Run a performance testing on demo blaze for >24 hours to 48 hours.
- **Output:**
  - Determine if the application has any memory leaks or dead locks over a long run.
  - Check the response time for critical APIs remains the same over a longer time.
  - Check there is no sudden crash or application failures.

## Test Metrics to be Collected in each Performance Run

1. From **JMeter:**
   - Response times (min, max, avg)
   - 95% response time
   - 99% response time
   - Error %
   - Throughput/ hits per second
   - Graphs:
     - Response codes per second
     - Hits per second
     - Response time over time
     - Active thread over time
2. From **Server (or APM tool like Dynatrace):**
   - CPU utilization
   - Memory utilization

## Exit Criteria

1. For the performance tests to be successful the **95% response time** for all the APIs **should be <2 seconds.**
2. The overall **error rate** for the performance test scenarios **should be < 2%.**
3. **No Exceptions, Errors and Warnings** should be seen in the server logs during and after tests.
4. The **CPU and Memory utilization** of application servers **should be <80%.**
5. Any Databases and caches like Redis should have optimum server stats like CPU and memory utilization in a healthy range.