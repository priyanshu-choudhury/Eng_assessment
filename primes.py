# Change the limit and run again.
limit = 50
primes = []

for number in range(2, limit + 1):
    if all(number % d != 0 for d in range(2, int(number ** 0.5) + 1)):
        primes.append(number)

print(f"Primes up to {limit}:")
print(primes)
print(f"Found {len(primes)} prime numbers.")
