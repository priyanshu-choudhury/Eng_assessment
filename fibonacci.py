# Each number is the sum of the previous two.
terms = 12
a, b = 0, 1
sequence = []

for _ in range(terms):
    sequence.append(a)
    a, b = b, a + b

print("Fibonacci sequence:")
print(sequence)
