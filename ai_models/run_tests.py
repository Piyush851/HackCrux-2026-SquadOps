from tests.test_ner import test_ner
from tests.test_summary import test_summary
from tests.test_classifier import test_classifier
from tests.test_pipeline import test_pipeline


print("\nRunning AI Model Tests...\n")

test_ner()
test_summary()
test_classifier()
test_pipeline()

print("\nAll tests completed!")